import * as React from "react";

interface Props {
  className?: string;
}

const Card: React.FC<Props> = ({ children, className = "" }) => (
  <div
    data-cy="Card"
    className={`flex flex-col rounded-lg shadow-lg dark:shadow-black/50 overflow-hidden ${className}`}
  >
    <div className="shrink-0">
      <img
        className="h-48 w-full object-cover"
        src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80"
        alt=""
      />
    </div>
    <div className="flex-1 bg-white dark:bg-gray-800 p-6 flex flex-col justify-between">
      <div className="flex-1">
        <p className="text-sm font-light text-blue">
          <a href="#" className="hover:underline">
            article
          </a>
          ,
          <a href="#" className="hover:underline">
            react
          </a>
          ,
          <a href="#" className="hover:underline">
            mobx
          </a>
        </p>
        <a href="#" className="block mt-2">
          <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
            Boost your conversion rate
          </h4>
          <p className="mt-3 text-base text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            accusantium praesentium eius, ut atque fuga culpa, similique sequi
            cum eos quis dolorum.
          </p>
          {children}
        </a>
      </div>
      <div className="mt-6 flex items-center">
        <div className="shrink-0">
          <a href="#">
            <span className="sr-only">Roel Aufderehar</span>
            <img
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </a>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900  dark:text-gray-200">
            <a href="#" className="hover:underline">
              Roel Aufderehar
            </a>
          </p>
          <div className="flex space-x-1 text-sm text-gray-500">
            <time dateTime="2020-03-16">Mar 16, 2020</time>
            <span aria-hidden="true">&middot;</span>
            <span>6 min read</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Card;
