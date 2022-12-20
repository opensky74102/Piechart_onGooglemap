'restrict'
export interface IItem {
  compass: string,
  frequency: number,
  antenatype: string,
  angle: number,
  color: string,
}
export interface IPieDetail {
  towerName: string,
  latitude: number,
  longitude: number,
  rotate: number,
  radius: number,
  items: IItem[],
}