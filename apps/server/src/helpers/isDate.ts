import moment from 'moment'

export const isDate = ( value: string, { req, location, path }: any ) => {
  
    if(!value){
        return false;
    }   

    const date = moment(value);
    if(date.isValid()){
        return true;
    } else {
        return false;
    }

}