export default function PaymentModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}): JSX.Element {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      <div className="bg-slate-500 opacity-60 absolute inset-0"></div>
      <div className="bg-white rounded-lg shadow-lg px-10 py-6 z-50">
        <div className="text-xl font-semibold mb-4">
          구매를 진행하시겠습니까?
        </div>
        <div className="flex justify-end">
          <button
            className="mr-2 bg-indigo-500 text-white px-4 py-2 rounded font-medium hover:bg-indigo-600"
            onClick={onConfirm}
          >
            네
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded font-medium hover:bg-gray-600"
            onClick={onCancel}
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
}
