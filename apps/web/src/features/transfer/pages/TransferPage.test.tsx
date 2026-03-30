import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TransferPage } from './TransferPage'
import { useAccountStore } from '../../dashboard/store/account.store'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, beforeEach } from 'vitest'

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
    useAccountStore.setState({
      accounts: [
        {
          id: "main",
          name: "Conta Principal",
          balance: 1000,
          transactions: [],
        },
        {
          id: "secondary",
          name: "Conta Secundária",
          balance: 500,
          transactions: [],
        },
      ],
      currentAccountId: "main",
    })
  })

  it('should transfer money and update balances', async () => {
    render(<TransferPage />, { wrapper })

    const amountInput = screen.getByLabelText(/valor/i)
    const descriptionInput = screen.getByLabelText(/descrição/i)
    const selectTrigger = screen.getByRole('combobox')
    const submitButton = screen.getByRole('button', { name: /transferir/i })

    fireEvent.change(amountInput, { target: { value: '100' } })
    fireEvent.change(descriptionInput, { target: { value: 'Test transfer' } })
    fireEvent.click(selectTrigger)
    const secondaryOption = screen.getByText(/Conta Secundária/i)
    fireEvent.click(secondaryOption)
    fireEvent.click(submitButton)

    await waitFor(() => {
      const state = useAccountStore.getState()
      const mainAccount = state.accounts.find(a => a.id === 'main')!
      const secondaryAccount = state.accounts.find(a => a.id === 'secondary')!
      expect(mainAccount.balance).toBe(900)
      expect(secondaryAccount.balance).toBe(600)
      expect(mainAccount.transactions).toHaveLength(1)
      expect(secondaryAccount.transactions).toHaveLength(1)
    })
  })

  it('should show validation errors for invalid input', async () => {
    render(<TransferPage />, { wrapper })

    const submitButton = screen.getByRole('button', { name: /transferir/i })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/valor deve ser maior que 0/i)).toBeInTheDocument()
      expect(screen.getByText(/descrição é obrigatória/i)).toBeInTheDocument()
      expect(screen.getByText(/selecione uma conta de destino/i)).toBeInTheDocument()
    })
  })
})