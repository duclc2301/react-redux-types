import React from 'react';
import { displayRepo, setCurrentPage } from 'slices/issuesDisplaySlice';
import { useTypedDispatch, useTypedSelector } from 'store';
import List from 'views/List';
import Search from 'views/Search';

export default function App() {
  const dispatch = useTypedDispatch();

  const { org, repo, page } = useTypedSelector((state) => state.issuesDisplay);

  const setOrgAndRepo = (org: string, repo: string) => {
    dispatch(displayRepo({ org, repo }));
  };

  const setJumpToPage = (page: number) => {
    dispatch(setCurrentPage({ page }));
  };

  return (
    <div>
      <Search
        org={org}
        repo={repo}
        setOrgAndRepo={setOrgAndRepo}
        setJumpToPage={setJumpToPage}
      />
      <List org={org} repo={repo} page={page} setJumpToPage={setJumpToPage} />
    </div>
  );
}
