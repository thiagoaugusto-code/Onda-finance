import '@testing-library/jest-dom'
import { expect, vi, describe, it, beforeEach } from 'vitest'

;(globalThis as any).describe = describe
;(globalThis as any).it = it
;(globalThis as any).expect = expect
;(globalThis as any).beforeEach = beforeEach
;(globalThis as any).vi = vi