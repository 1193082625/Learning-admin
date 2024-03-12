import React from 'react';
import { fetchBooks } from '@/Server/actions/BookActions';
import { Pagination } from '@nextui-org/react';
import { Header } from '@/components/Header';
type ISearchQuery = {
  page: string;
}
type HomeProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const BookItem = (data: any) => {
  return (
    <div>
      <h3>{data.title}</h3>
      <p>{data.content}</p>
    </div>
  )
}

export default async function Home({
  searchParams
}: HomeProps) {
  // get the current page number
  const { page } = searchParams as ISearchQuery;
  const pageNumber = page && !isNaN(Number(page)) ? Number(page) : 1;

  /* begin:: feetch book list */
  const { data: books, totalCount } = await fetchBooks(pageNumber);
  /* end:: feetch book list */

  return (
    <div className="home-page w-full px-8 grow flex flex-col mt-2">
      <h2>Books:</h2>
      <hr className='w-full my-3 h-1 border-stone-400' />
      <span className='text-sm'>{books.length} of {totalCount} Items </span>
      <div className="mt-6 result-container">
        {books?.length ?
          <>
            {books.map((book, index) => (<BookItem key={index} {...book} />))}
            <Pagination
              initialPage={pageNumber}
              total={totalCount}
            />
          </>
          :
          <h4 className='text-center'>No books found</h4>}
      </div>
    </div>
  );
}