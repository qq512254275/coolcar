export namespace routing {
    export interface DrivingOpts{
        trip_id: string
    }

    export function driving(o: DrivingOpts){
        return `/pages/driving/driving?trip_id=${o.trip_id}`
    }

    export interface LockOpts {
        car_id: string
    }

    export function lock(o: LockOpts){
        return `/pages/lock/lock?car_id=${o.car_id}`
    }
}