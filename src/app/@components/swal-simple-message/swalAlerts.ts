import Swal from 'sweetalert2';


export function SwalCorrect(titleAlarm: string, textAlarm?: string) {
    return Swal.fire({
        title: titleAlarm,
        text: textAlarm ? textAlarm : null,
        icon: 'success',
        timer: 3500,
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
    })
}

export function SwalError(titleAlarm: string, textAlarm?: string) {
    return Swal.fire({
        title: titleAlarm,
        icon: 'error',
        text: textAlarm ? textAlarm : null,
        timer: 3500,
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
    })
}