import { teamMember } from "./teamMember";

export class team {
    "TEAMID": number;
    "DEPREF": number;
    "DEP_NAME": string;
    "TEAM_DEF": string;
    "TEAM_NAME": string;
    "MEMBER_COUNT": number;
    "MEMBERS": teamMember[]
}