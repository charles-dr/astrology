export interface Zodiac {
    name: string;
    dateFrom: { month: number, date: number };
    strDateFrom?: string;
    dateTo: { month: number, date: number };
    strDateTo?: string;
    icon: string;
    element?: string;
    quality?: string;
    color?: string;
    day?: string;
    ruler?: string;
    GOC?: string;
    luckyNumbers?: string;
    strengths?: string;
    weaknesses?: string;
    likes?: string;
    dislikes?: string;
    traits?: string;
}
