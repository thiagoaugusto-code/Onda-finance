import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TransferPage } from './TransferPage'
import { useAccountStore } from '../../dashboard/store/account.store'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </QueryClientProvider>
)

describe('TransferPage', () => {
  beforeEach(() => {
    // Reset store
    useAccountStore.getState().balance = 1000
    useAccountStore.getState().transactions = []
  })

  it('should transfer money and update balance', async () => {
    render(<TransferPage />, { wrapper })

    const amountInput = screen.getByLabelText(/valor/i)
    const descriptionInput = screen.getByLabelText(/descrição/i)
    const submitButton = screen.getByRole('button', { name: /transferir/i })

    fireEvent.change(amountInput, { target: { value: '100' } })
    fireEvent.change(descriptionInput, { target: { value: 'Test transfer' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(useAccountStore.getState().balance).toBe(900)
      expect(useAccountStore.getState().transactions).toHaveLength(1)
      expect(useAccountStore.getState().transactions[0]).toMatchObject({
        type: 'expense',
        amount: 100,
        description: 'Test transfer',
      })
    })
  })

  it('should show validation errors for invalid input', async () => {
    render(<TransferPage />, { wrapper })

    const submitButton = screen.getByRole('button', { name: /transferir/i })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/valor deve ser maior que 0/i)).toBeInTheDocument()
      expect(screen.getByText(/descrição é obrigatória/i)).toBeInTheDocument()
    })
  })
})