import Swal from "sweetalert2";

export const swalDelete = (callback: () => void) => {
  Swal.fire({
    title: "Xác nhận",
    text: "Bạn có chắc chắc muốn xóa?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Đồng ý!",
    cancelButtonText: "Hủy!"
  }).then(async (result) => {
    if (result.isConfirmed) callback();
  });
};

export const swalInfo = (title: string, text: string, callback: () => void) => {
  Swal.fire({
    title,
    text,
    icon: "info",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Đồng ý!"
  }).then((result) => {
    if (result.isConfirmed) callback();
  });
};

export const swalQuestion = (title: string, text: string, callback: () => void) => {
  Swal.fire({
    title,
    text,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Đồng ý!",
    cancelButtonText: "Hủy!"
  }).then((result) => {
    if (result.isConfirmed) callback();
  });
};
