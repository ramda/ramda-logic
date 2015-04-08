#lang racket

; logic variables are modeled as vectors
(define (var c) (vector c))

(define (var? x) (vector? x))

(define (var=? x1 x2) (= (vector-ref x1 0) (vector-ref x2 0)))

(define (walk u s)
  (let ((pr (and (var? u) (assq (lambda (v) (var=? u v)) s))))
     (if pr (walk (cdr pr) s) u)))


(define (ext-s x v s) '((,x . ,v) . ,s))

; == 
; basic goal constructor
; takes two terms and returns a goal that succeeds if the two terms
; _unify_ in the recieved state
(define (== u v)
   ; λg (s/c) => indicates this is a goal that takes a "state" argument.
   ; if the yerms unify, this goal returns a new (possibly extended) substitution.
   ; if they fail to unify, `mzero` (empty list) is returned
   (lambda (s/c)
      (let ((s (unify u v (car s/c))))
        (if s (unit '( s . ,(cdr s/c))) mzero))))

; unit lifts the state (and variable counter) into a stream whose only element is that state
(define (unit s/c) (cons s/c mzero))

(define mzero '())

; to unify terms, both are walked in the substitution `s`.
; cases:
;   both terms walk to same variable => s
;   one term walks to a variable     => extend s with the new binding
;   both walk to pairs               => recursively unify
;   non-variable/non-pair terms unify if they are `eqv?`
;   otherwise fail
(define (unify u v s)
   (let ((u (walk u s)) (v (walk v s)))
      (cond
        ((and (var? u) (var? v) (var=? u v)) s)
        ((var? u) (ext-s u v s))
        ((var? v) (ext-s v u s))
        ((and (pair? u) (pair? v))
          (let ((s (unify (car u) (car v) s)))
            (and s (unify (cdr u) (cdr v) s))))
        (else (and (eqv? u v) s)))))

; call/fresh
; basic goal constructor
; takes a unary function `f` whose body is a goal, and returns a goal
(define (call/fresh f)
  (lambda (s/c)
    (let ((c (cdr s/c)))
      ((f (var c)) '(,(car s/c) . ,(+ c 1))))))

; disj
; basic goal constructor
; takes two goals as arguments and returns a goal that succeeds if either goal succeeds
(define (disj g1 g2 ) (lambda (s/c) (mplus (g1 s/c) (g2 s/c))))

; conj
; basic goal constructor
; takes two goals as arguments and returns a goal that succeeds if both goals succeed
(define (conj g1 g2 ) (lambda (s/c) (bind (g1 s/c) g2)))


; microKanren streams:
; ---------------------------------
; empty stream
; immature stream
; mature stream: a pair of (state . stream) which comprise together the streams 
;                first and remaining states.
; ---------------------------------


; mplus
; operator
; merges streams, returns an "immature stream", roughly a lazy list
; when returning a finite number of infinitely many results, the result is a 
; partially computed stream, with a lambda/immature stream in the cdr of the last pair.
(define (mplus $1 $2 )
  (cond
    ((null? $1 ) $2)
    ; the `procedure` guard catches immature streams.
    ;                (λ$ () => indicates this is a stream
    ((procedure? $1) (lambda () (mplus $2 ($1))))
    (else (cons (car $1) (mplus (cdr $1 ) $2)))))

; bind
; operator
; wraps around mplus to enable potentially infinite streams
(define (bind $ g)
  (cond
    ((null? $) mzero)
    ; as in `mplus`, a stream may be a function. the returned stream is wrapped in a 
    ; lambda to ensure termination
    ((procedure? $) (lambda () (bind ($) g)))
    (else (mplus (g (car $)) (bind (cdr $) g)))))

