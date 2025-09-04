import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';

export type LibraryStatus = 'all' | 'learned' | 'not_learned';

interface SearchBarProps {
  query: string;
  // eslint-disable-next-line no-unused-vars
  onQueryChange: (value: string) => void;
  status: LibraryStatus;
  // eslint-disable-next-line no-unused-vars
  onStatusChange: (value: LibraryStatus) => void;
}

/**
 * Search bar with clear button and a status dropdown filter.
 */
const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  status,
  onStatusChange,
}) => {
  return (
    <div className='flex items-center gap-3'>
      <div className='relative flex-1'>
        <input
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          placeholder='Search vocabulary...'
          className='border-1 border-black px-2 py-2 text-sm w-full pr-10'
          style={{ boxShadow: '1px 2px 0px 0px #000' }}
        />
        {query && (
          <button
            aria-label='Clear search'
            onClick={() => onQueryChange('')}
            className='absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full border-1 border-black bg-white flex items-center justify-center text-base leading-none'
            style={{ boxShadow: 'px 1px 0px 0px #000' }}
          >
            <span className='text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none'>
              x
            </span>
          </button>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          className='border-1 border-black px-3 py-2 text-sm bg-white'
          style={{ boxShadow: '1px 2px 0px 0px #000' }}
        >
          {status === 'all'
            ? 'Tất cả'
            : status === 'not_learned'
              ? 'Chưa học'
              : 'Đã học'}
        </DropdownMenuTrigger>
        <DropdownMenuContent className='p-1 min-w-[8rem] bg-white'>
          <DropdownMenuRadioGroup
            value={status}
            onValueChange={v => onStatusChange(v as LibraryStatus)}
          >
            <DropdownMenuRadioItem value='all'>Tất cả</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='not_learned'>
              Chưa học
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='learned'>
              Đã học
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchBar;
