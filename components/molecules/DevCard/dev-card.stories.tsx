import { ComponentMeta, ComponentStory } from "@storybook/react";
import DevCard from "components/molecules/DevCard/dev-card";

const storyConfig = {
  title: "Design System/Molecules/DevCard",
  component: DevCard,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof DevCard>;

export default storyConfig;

const DevCardTemplate: ComponentStory<typeof DevCard> = (args) => <DevCard {...args} />;
export const DevCardStory = DevCardTemplate.bind({});

DevCardStory.args = {
  user: demoUser(),
  isInteractive: true
};

function demoUser() {
  return {
    "email": "",
    "notification_count": 0,
    "insights_count": 0,
    "personal_workspace_id": "",
    "id": 20603494,
    "open_issues": 31,
    "created_at": "2016-07-22T19:49:17.000Z",
    "updated_at": "2024-08-08T19:49:09.940Z",
    "first_opened_pr_at": "2022-11-09T20:50:08.000Z",
    "first_pushed_commit_at": "2019-04-11T20:59:57.000Z",
    "connected_at": "2024-01-31T17:16:08.609Z",
    "campaign_start_date": "2024-01-31T17:16:08.609Z",
    "node_id": "",
    "avatar_url": "https://avatars.githubusercontent.com/u/20603494?u=dab23ed63c98dc94be294eb1a826e8d204b72235&v=4",
    "gravatar_id": "",
    "url": "https://github.com/zeucapua",
    "login": "zeucapua",
    "is_private": false,
    "is_open_sauced_member": true,
    "is_onboarded": true,
    "is_waitlisted": true,
    "role": 10,
    "bio": "Fullstack Web Developer and Coding Educator",
    "blog": "zeu.dev",
    "name": "zeudev",
    "twitter_username": "zeu_dev",
    "linkedin_url": "",
    "github_sponsors_url": "",
    "discord_url": "",
    "company": "@open-sauced",
    "location": "Los Angeles, CA",
    "display_local_time": false,
    "interests": "javascript,typescript,svelte,react",
    "hireable": false,
    "public_repos": 58,
    "public_gists": 0,
    "type": "User",
    "display_email": false,
    "receive_collaboration": false,
    "receive_product_updates": true,
    "timezone": "Pacific Daylight Time",
    "coupon_code": "",
    "languages": {
        "CSS": 228,
        "HTML": 346,
        "Svelte": 10076,
        "JavaScript": 1015,
        "TypeScript": 5284
    },
    "highlights_count": 0,
    "following_count": 1,
    "followers_count": 1,
    "oscr": 165.20000000000002,
    "devstats_updated_at": "2024-08-08T19:49:08.000Z",
    "accepted_usage_terms": false,
    "recent_pull_request_velocity_count": 4,
    "recent_pull_requests_count": 23,
    "is_maintainer": true,
    "commits": 0,
    "prs_created": 19,
    "prs_reviewed": 14,
    "issues_created": 15,
    "commit_comments": 0,
    "issue_comments": 14,
    "pr_review_comments": 3,
    "comments": 17,
    "total_contributions": 48
  };
}
