import { useSearchParams } from 'react-router-dom';

import Select from './Select';

interface Option {
  label: string;
  value: string;
}

function SortBy({ options }: { options: Option[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';

  function handleChange(event: React.ChangeEvent) {
    searchParams.set('sortBy', (event.target as HTMLSelectElement).value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      value={sortBy}
      type="white"
      onChange={handleChange}
    />
  );
}

export default SortBy;
