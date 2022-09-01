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
    cancelButtonText: "Hủy!",
  }).then(async (result) => {
    if (result.isConfirmed) callback();
  });
};
