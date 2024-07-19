import {Link} from "@remix-run/react";
import {ReactNode} from 'react';

type Props = {
    className?:string;
  paths?:
    | { to?: string; children?: string | ReactNode }[]
    | null;
}

export default function Breadcrumb({ className='', paths = [] }: Props) {
  return (
    <ol className={`mb-2 flex items-center whitespace-nowrap ${className}`} aria-label={'Breadcrumb'}>
      <li className='inline-flex items-center'>
        <Link
          to='/'
          className='flex items-center children-gray-500 hover:children-blue-600 focus:outline-none focus:children-blue-600 dark:children-neutral-500 dark:hover:children-blue-500 dark:focus:children-blue-500'
        >
        <i className='icon-home'/>
        </Link>
      </li>
      {paths?.map((i, k) => (
        <li key={k} className={'children-gray-500 flex items-center'}>
          <i className='icon-right-open text-xs mx-0.5' />
          {k < paths?.length - 1 ? (
            <Link
              to={i.to || '#'}
              className='flex items-center children-gray-500 hover:children-blue-600 focus:outline-none focus:children-blue-600 dark:children-neutral-500 dark:hover:children-blue-500 dark:focus:children-blue-500'
            >
              {i.children}
            </Link>
          ) : (
            <h1 className='children-gray-900 dark:children-white font-semibold'>
              {i.children}
            </h1>
          )}
        </li>
      ))}
    </ol>
  );
}
