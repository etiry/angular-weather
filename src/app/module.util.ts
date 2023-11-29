import { Day, Forecast } from "./models/forecast";
import { Location } from "./models/location";
import { Weather } from "./models/weather";

interface Temps {
  [key: string]: Array<number>
}

export class ModuleUtil {
  static getDayOfWeek(dateString: string): string {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
    const dayIndex = new Date(dateString).getDay();
  
    return dayNames[dayIndex];
  };
  
  static getTimeOfDay(dateString: string): number {
    return new Date(dateString).getHours();
  };
  
  static getTempsByDay(tempData: { list: Array<any> }): Temps {
    const tempsByDay = {} as Temps;
    tempData.list.forEach((threeHours: { dt_txt: string, main: any }) => {
      if (!Object.keys(tempsByDay).includes(ModuleUtil.getDayOfWeek(threeHours.dt_txt))) {
        tempsByDay[ModuleUtil.getDayOfWeek(threeHours.dt_txt)] = [threeHours.main.temp];
      } else {
        tempsByDay[ModuleUtil.getDayOfWeek(threeHours.dt_txt)].push(threeHours.main.temp);
      }
    });
    return tempsByDay;
  };
  
  static getHighTemp(temps: Array<number>): number {
    return Math.round(Math.max(...temps));
  } 
  
  static getLowTemp(temps: Array<number>): number {
    return Math.round(Math.min(...temps));
  }

  static setWeather(location: Location, data: any): Weather {
    return {
      location,
      temp: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon
    }
  }

  static setForecast(location: Location, data: any): Forecast {
    const days: Day[] = [];

    data.list.forEach((threeHours: { dt_txt: string, weather: Array<any> }) => {
      if (ModuleUtil.getTimeOfDay(threeHours.dt_txt) === 12) {
        const tempsByDay = ModuleUtil.getTempsByDay(data);
        const day = {
          dayOfWeek: ModuleUtil.getDayOfWeek(threeHours.dt_txt),
          temp: {
            min: ModuleUtil.getLowTemp(tempsByDay[ModuleUtil.getDayOfWeek(threeHours.dt_txt)]),
            max: ModuleUtil.getHighTemp(tempsByDay[ModuleUtil.getDayOfWeek(threeHours.dt_txt)])
          }, 
          description: threeHours.weather[0].main,
          icon: threeHours.weather[0].icon,
        };
  
        days.push(day);
      }
    });

    return {
      location,
      days
    }
  }
}