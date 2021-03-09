var NhanVien = function(){
    this.maNhanVien = '';
    this.tenNhanVien = '';
    this.luongCoBan = '';
    this.chucVu = '';
    this.heSoChucVu = '';
    this.soGioLamTrongThang = '';

    this.tinhLuong = function(){
        return this.luongCoBan * this.heSoChucVu;
    }

    this.xepLoaiNhanVien = function(){
        if(this.soGioLamTrongThang >= 120){
            return 'Nhân viên xuất sắc';
        }
        if(this.soGioLamTrongThang >= 100){
            return 'Nhân viên giỏi';
        }
        if(this.soGioLamTrongThang >= 80){
            return 'Nhân viên khá';
        }
        if(this.soGioLamTrongThang >= 50){
            return 'Nhân viên trung bình';
        }
        return 'Không xác đinh';
    }
}