import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  // Only show breadcrumbs for dashboard pages
  if (!segments.includes('dashboard')) return null;

  const crumbs = [];
  let path = '';
  for (let i = 0; i < segments.length; i++) {
    path += '/' + segments[i];
    crumbs.push({
      label: segments[i].charAt(0).toUpperCase() + segments[i].slice(1),
      href: path,
    });
  }

  return (
    <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/dashboard" className="hover:underline text-blue-600">Dashboard</Link>
        </li>
        {crumbs.slice(1).map((crumb, idx) => (
          <li key={crumb.href} className="flex items-center">
            <span className="mx-2">/</span>
            {idx === crumbs.length - 2 ? (
              <span className="font-semibold text-gray-700">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="hover:underline text-blue-600">{crumb.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs; 