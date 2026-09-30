//go:build linux || darwin

// Package preview demonstrates Go highlighting.
package preview

import out "fmt"

const (
	Idle = iota
	Busy
)

type Number interface {
	~int | ~float64
}

type Runner interface {
	Run(chan<- string)
}

// Worker.Run sends Value to its output channel.
type Worker[T any] struct {
	Value T `json:"value,omitempty"`
}

func (w *Worker[T]) Run(dst chan<- string) {
	go func() {
		defer close(dst)
		select {
		case dst <- out.Sprintf("%[1]v %%", w.Value):
		default:
		}
	}()
}

func Clamp[T Number](v T) T {
	return max(v, T(0))
}

func Preview() {
	var missing *Worker[int] = nil
	ch := make(chan string, 1)
	w := Worker[int]{Value: Clamp(3)}
	w.Run(ch)
	out.Printf("%s\n", <-ch)
	_, _ = missing, `raw\n%s`
}
