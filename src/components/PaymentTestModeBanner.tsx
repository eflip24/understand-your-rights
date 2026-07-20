const clientToken = import.meta.env.VITE_PAYMENTS_CLIENT_TOKEN as string | undefined;

export function PaymentTestModeBanner() {
  if (!clientToken) return null;
  if (clientToken.startsWith("pk_test_")) {
    return (
      <div className="w-full bg-orange-100 border-b border-orange-300 px-4 py-2 text-center text-xs text-orange-800">
        All payments on this preview are in test mode. Use card <code className="font-mono">4242 4242 4242 4242</code>, any future expiry, any CVC.
      </div>
    );
  }
  return null;
}
