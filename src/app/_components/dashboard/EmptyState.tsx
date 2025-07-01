const EmptyState = ({ message }: { message: string }) => (
  <tr>
    <td colSpan={99} className="py-12 text-center text-gray-400">
      <div className="flex flex-col items-center justify-center gap-2">
        <span className="text-5xl">🗒️</span>
        <span className="text-lg">{message}</span>
      </div>
    </td>
  </tr>
);

export default EmptyState; 