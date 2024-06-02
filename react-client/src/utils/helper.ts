import toast from "react-hot-toast";

export function createdToast(entity: string) {
    return toast.success(`${entity} created successfully.`);
}

export function updatedToast(entity: string) {
    return toast.success(`${entity} updated successfully.`);
}

export function deletedToast(entity: string) {
    return toast.success(`${entity} deleted successfully.`);
}

export function errorToast(entity = "Something went wrong. Please try again") {
    return toast.error(entity);
}
