package room

import (
	"crypto/rand"
	"encoding/base64"
	"errors"
	"sync"
	"time"
)

const inviteCodeBytes = 9 // url-safe base64 without padding → 12 chars

// Room is an in-memory session container for v0.1 (no persistence).
type Room struct {
	ID         string    `json:"id"`
	InviteCode string    `json:"inviteCode"`
	CreatedAt  time.Time `json:"createdAt"`
}

// Store holds rooms keyed by invite code (single source for lookup).
type Store struct {
	mu     sync.RWMutex
	byCode map[string]*Room
}

// NewStore returns an empty in-memory room store.
func NewStore() *Store {
	return &Store{byCode: make(map[string]*Room)}
}

// Create allocates a new room with a unique invite code.
func (s *Store) Create() (*Room, error) {
	const maxAttempts = 16
	for i := 0; i < maxAttempts; i++ {
		code, err := randomInviteCode()
		if err != nil {
			return nil, err
		}
		s.mu.Lock()
		if _, exists := s.byCode[code]; exists {
			s.mu.Unlock()
			continue
		}
		r := &Room{
			ID:         newRoomID(),
			InviteCode: code,
			CreatedAt:  time.Now().UTC(),
		}
		s.byCode[code] = r
		s.mu.Unlock()
		return r, nil
	}
	return nil, errors.New("room: could not allocate unique invite code")
}

func randomInviteCode() (string, error) {
	b := make([]byte, inviteCodeBytes)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	// URL-safe, no padding — allowed in path per PROTOCOL (/g/{inviteCode}).
	s := base64.RawURLEncoding.EncodeToString(b)
	return s, nil
}

func newRoomID() string {
	b := make([]byte, 16)
	if _, err := rand.Read(b); err != nil {
		panic("room: crypto/rand failed: " + err.Error())
	}
	return base64.RawURLEncoding.EncodeToString(b)
}
