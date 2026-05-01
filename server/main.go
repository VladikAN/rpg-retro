package main

import (
	"embed"
	"encoding/json"
	"io"
	"io/fs"
	"log"
	"net/http"
	"os"
	"path"
	"strings"
	"time"

	"rpg-retro/server/internal/room"
)

//go:embed all:web/dist
var static embed.FS

func main() {
	mux := http.NewServeMux()
	rooms := room.NewStore()

	mux.HandleFunc("GET /health", func(w http.ResponseWriter, _ *http.Request) {
		w.Header().Set("Content-Type", "text/plain; charset=utf-8")
		w.WriteHeader(http.StatusOK)
		_, _ = io.WriteString(w, "ok\n")
	})

	mux.HandleFunc("POST /api/v1/rooms", func(w http.ResponseWriter, r *http.Request) {
		created, err := rooms.Create()
		if err != nil {
			log.Printf("create room: %v", err)
			http.Error(w, "internal server error", http.StatusInternalServerError)
			return
		}
		resp := createRoomResponse{
			RoomID:     created.ID,
			InviteCode: created.InviteCode,
			CreatedAt:  created.CreatedAt.Format(time.RFC3339Nano),
			Paths: roomPaths{
				G:    "/g/" + created.InviteCode,
				Join: "/join/" + created.InviteCode,
			},
		}
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.WriteHeader(http.StatusCreated)
		if err := json.NewEncoder(w).Encode(resp); err != nil {
			log.Printf("encode create room: %v", err)
		}
	})

	fsys, err := fs.Sub(static, "web/dist")
	if err != nil {
		log.Fatalf("static fs: %v", err)
	}
	mux.Handle("GET /", withSecurityHeaders(spaFileServer{fsys: fsys}))

	port := "8080"
	if p := os.Getenv("PORT"); p != "" {
		port = p
	}
	addr := ":" + port
	log.Printf("server listening on %s", addr)
	if err := http.ListenAndServe(addr, mux); err != nil {
		log.Fatal(err)
	}
}

type createRoomResponse struct {
	RoomID     string    `json:"roomId"`
	InviteCode string    `json:"inviteCode"`
	CreatedAt  string    `json:"createdAt"`
	Paths      roomPaths `json:"paths"`
}

type roomPaths struct {
	G    string `json:"g"`
	Join string `json:"join"`
}

type spaFileServer struct{ fsys fs.FS }

func (s spaFileServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.Header().Set("Allow", "GET")
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	rel := strings.Trim(path.Clean(r.URL.Path), "/")
	if rel == "" || rel == "." {
		rel = "index.html"
	} else if strings.Contains(rel, "..") {
		http.Error(w, "not found", http.StatusNotFound)
		return
	} else {
		f, err := s.fsys.Open(rel)
		if err != nil {
			rel = "index.html"
		} else {
			stat, serr := f.Stat()
			_ = f.Close()
			if serr == nil && stat != nil && stat.IsDir() {
				rel = "index.html"
			}
		}
	}
	http.ServeFileFS(w, r, s.fsys, rel)
}

func withSecurityHeaders(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")
		h.ServeHTTP(w, r)
	})
}
