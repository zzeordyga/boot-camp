export function generateStaticParams() {
  return Array.from({ length: 10 }, (_, index) => ({
    id: String(index + 1),
  }));
}

import DetailsPage from '../../../../../views/2602095902/details/[id]/page';

export default function Page() {
  return <DetailsPage />;
}

