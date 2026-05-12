package room

import (
	"sync"
	"testing"
)

func TestStoreCreateUniqueCodes(t *testing.T) {
	s := NewStore()
	seen := make(map[string]struct{})
	const n = 100
	for i := 0; i < n; i++ {
		r, err := s.Create()
		if err != nil {
			t.Fatalf("Create: %v", err)
		}
		if r.InviteCode == "" {
			t.Fatal("empty invite code")
		}
		if _, dup := seen[r.InviteCode]; dup {
			t.Fatalf("duplicate invite code %q", r.InviteCode)
		}
		seen[r.InviteCode] = struct{}{}
	}
}

func TestStoreCreateConcurrent(t *testing.T) {
	s := NewStore()
	var wg sync.WaitGroup
	errs := make(chan error, 50)
	for i := 0; i < 50; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			_, err := s.Create()
			if err != nil {
				errs <- err
			}
		}()
	}
	wg.Wait()
	close(errs)
	for err := range errs {
		t.Fatalf("concurrent Create: %v", err)
	}
}
