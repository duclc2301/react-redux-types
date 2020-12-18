import axios from 'axios';
import parseLink, { Links } from 'parse-link-header';

export interface Label {
  id: number;
  name: string;
  color: string;
}

export interface User {
  login: string;
  avatar_url: string;
}

export interface Issue {
  id: number;
  title: string;
  number: number;
  user: User;
  body: string;
  labels: Label[];
  comments_url: string;
  state: 'open' | 'closed';
  comments: number;
}

export interface RepoDetails {
  id: number;
  name: string;
  full_name: string;
  open_issues_count: number;
}

export interface IssuesResult {
  pageLinks: Links | null;
  pageCount: number;
  issues: Issue[];
}

const getPageCount = (pageLinks: Links) => {
  if (!pageLinks) return 0;

  const isLastPage =
    Object.keys(pageLinks).length === 2 && pageLinks.first && pageLinks.prev;

  if (isLastPage) {
    // trang cuối cùng bằng trang trước đó cộng 1
    return Number(pageLinks.prev.page) + 1;
  } else if (pageLinks.last) {
    // trang cuối cùng
    return Number(pageLinks.last.page);
  } else return 0;
};

export async function getAllIssue(
  org: string,
  repo: string,
  page = 1
): Promise<IssuesResult> {
  try {
    const url = `https://api.github.com/repos/${org}/${repo}/issues?per_page=25&page=${page}`;
    const issuesResponse = await axios.get<Issue[]>(url);
    let pageCount = 0;

    const pageLinks = parseLink(issuesResponse.headers.link);

    if (pageLinks !== null) {
      pageCount = getPageCount(pageLinks);
    }

    return { pageLinks, pageCount, issues: issuesResponse.data };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getIssue(
  org: string,
  repo: string,
  number: number
): Promise<Issue> {
  try {
    const url = `https://api.github.com/repos/${org}/${repo}/issues/${number}`;
    const { data } = await axios.get<Issue>(url);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getRepoDetails(
  org: string,
  repo: string
): Promise<RepoDetails> {
  try {
    const url = `https://api.github.com/repos/${org}/${repo}`;
    const { data } = await axios.get<RepoDetails>(url);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
