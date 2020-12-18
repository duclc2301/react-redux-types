import { ChangeEventHandler, useState } from 'react';

type Props = {
  org: string;
  repo: string;
  setOrgAndRepo: (org: string, repo: string) => void;
  setJumpToPage: (page: number) => void;
};

type ChangeHandler = ChangeEventHandler<HTMLInputElement>;

export default function SearchForm(props: Props) {
  const { org, repo, setOrgAndRepo, setJumpToPage } = props;

  const [currentOrg, setCurrentOrg] = useState<string>(org);
  const [currentRepo, setCurrentRepo] = useState<string>(repo);
  const [page, setPage] = useState<number>(1);

  const handleOrgChange: ChangeHandler = (event) => {
    setCurrentOrg(event.target.value);
  };

  const handleRepoChange: ChangeHandler = (event) => {
    setCurrentRepo(event.target.value);
  };

  const handlePageChange: ChangeHandler = (event) => {
    setPage(Number(event.target.value));
  };

  const handleLoadRepo = () => {
    setOrgAndRepo(currentOrg, currentRepo);
  };

  const handleJumpToPage = () => {
    if (page >= 1) {
      setJumpToPage(page);
    }
  };

  return (
    <form>
      <div>
        <label htmlFor="org">Org:</label>
        <input name="org" value={currentOrg} onChange={handleOrgChange} />
        <br />
        <label htmlFor="repo">Repo:</label>
        <input name="repo" value={currentRepo} onChange={handleRepoChange} />
        <button type="button" onClick={handleLoadRepo}>
          Load Repo
        </button>
      </div>
      <div style={{ marginTop: 5 }}>
        <label htmlFor="jumpToPage">Issues Page:</label>
        <input
          name="jumpToPage"
          type="number"
          value={page}
          onChange={handlePageChange}
        />
        <button type="button" onClick={handleJumpToPage}>
          Jump to Page
        </button>
      </div>
    </form>
  );
}
