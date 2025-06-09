const TableSkeleton = () => (
  <tbody>
    {[...Array(5)].map((_, i) => (
      <tr key={i}>
        {[...Array(5)].map((_, j) => (
          <td key={j} className="px-4 py-3 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-full" />
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);

export default TableSkeleton; 