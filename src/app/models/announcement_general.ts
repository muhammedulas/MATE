import { companyAnnouncement } from "./companyAnnouncement";
import { departmentAnnouncement } from "./departmentAnnouncement";
import { teamAnnouncement } from "./teamAnnouncement";

export class announcement_general {
    "teamLevel": teamAnnouncement[];
    "departmentLevel": departmentAnnouncement[];
    "companyLevel": companyAnnouncement[]
}