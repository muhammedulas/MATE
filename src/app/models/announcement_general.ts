import { companyAnnouncement } from "./companyAnnouncement";
import { departmentAnnouncement } from "./departmentAnnouncement";
import { teamAnnouncement } from "./teamAnnouncement";

export class announcement_general {
    "TeamAnnouncements": teamAnnouncement[];
    "DepartmentAnnouncements": departmentAnnouncement[];
    "CompanyAnnouncements": companyAnnouncement[]
}