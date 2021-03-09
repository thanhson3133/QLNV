var validation = new Validation();
var mangNhanVien = [];
var qlnvsv = new QuanLyNhanVienService();

document.querySelector('#btnThemNhanVien').onclick = function () {
    var nv = new NhanVien();
    nv.maNhanVien = document.querySelector('#maNhanVien').value;
    nv.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nv.heSoChucVu = document.querySelector('#chucVu').value;
    nv.luongCoBan = document.querySelector('#luongCoBan').value;
    nv.soGioLamTrongThang = document.querySelector('#soGioLam').value;


    var mangOption = document.querySelector('#chucVu').options;
    var viTriOptionChon = document.querySelector('#chucVu').selectedIndex;

    nv.chucVu = mangOption[viTriOptionChon].innerHTML;



    var tiepTucChay = true;

    tiepTucChay &= validation.kiemTraDoDai(nv.maNhanVien, 'Mã nhân viên', '#kiemTraMaNhanVien', 4, 6) & validation.kiemTraTatCaLaKyTu(nv.tenNhanVien, 'Tên nhân viên', '#kiemTraTenNhanVien') & validation.kiemTraGiaTri(nv.luongCoBan, 'Lương cơ bản', '#kiemTraLuongCoBan', 1000000, 20000000) & validation.kiemTraGiaTri(nv.soGioLamTrongThang, 'Số giờ làm trong tháng', '#kiemTraSoGioLam', 50, 150);

    if (!tiepTucChay) {
        return;
    }

    for (var i = 0; i < mangNhanVien.length; i++) {
        if (mangNhanVien[i].maNhanVien != nv.maNhanVien) {
            continue;
        }

        document.querySelector('#kiemTraMaNhanVien').innerHTML = 'Mã nhân viên đã tồn tại';
        return;
    }
    document.querySelector('#kiemTraMaNhanVien').innerHTML = '';



    var promise = qlnvsv.themNhanVien(nv);

    promise.then(function (result) {
        console.log(result.data);
        layDuLieu();
        document.querySelector('#maNhanVien').value = '';
        document.querySelector('#tenNhanVien').value = '';
        document.querySelector('#chucVu').value = 3;
        document.querySelector('#luongCoBan').value = '';
        document.querySelector('#soGioLam').value = '';
    });

    promise.catch(function (error) {
        console.log(error);
    });

}

var renderTableNhanVien = function (arrNhanVien) {

    var noiDungTable = '';
    for (var i = 0; i < arrNhanVien.length; i++) {
        var nv = new NhanVien();
        nv.maNhanVien = arrNhanVien[i].maNhanVien;
        nv.tenNhanVien = arrNhanVien[i].tenNhanVien;
        nv.heSoChucVu = arrNhanVien[i].heSoChucVu;
        nv.luongCoBan = arrNhanVien[i].luongCoBan;
        nv.soGioLamTrongThang = arrNhanVien[i].soGioLamTrongThang;
        nv.chucVu = arrNhanVien[i].chucVu;

        noiDungTable += `
            <tr>
                <td>${nv.maNhanVien}</td>
                <td>${nv.tenNhanVien}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.luongCoBan}</td>
                <td>${nv.tinhLuong()}</td>
                <td>${nv.soGioLamTrongThang}</td>
                <td>${nv.xepLoaiNhanVien()}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaNhanVien('${nv.maNhanVien}')">Xóa</button>
                    <button class="btn btn-primary" onclick="chinhSua('${nv.maNhanVien}')">Chỉnh sửa</button>
                </td>
            </tr>
        `
    }

    document.querySelector('#tableNhanVien').innerHTML = noiDungTable;
}

var layDuLieu = function () {

    var promise = qlnvsv.layDanhSachNhanVien();

    promise.then(function (result) {
        renderTableNhanVien(result.data);
    })

    promise.catch(function (error) {
        console.log(error);
    })
}

var xoaNhanVien = function (maNV) {
    var promise = qlnvsv.xoaNhanVien(maNV);

    promise.then(function (result) {
        layDuLieu();
    })

    promise.catch(function (error) {
        console.log(error);
    })
}

var chinhSua = function (maNV) {
    document.querySelector('#btnThemNhanVien').disabled = true;
    document.querySelector('#btnLuuThongTin').disabled = false;
    document.querySelector('#maNhanVien').disabled = true;

    var promise = qlnvsv.layThongTinNhanVien(maNV);

    promise.then(function (result) {
        document.querySelector('#maNhanVien').value = result.data.maNhanVien;
        document.querySelector('#tenNhanVien').value = result.data.tenNhanVien;
        document.querySelector('#chucVu').value = result.data.heSoChucVu;
        document.querySelector('#luongCoBan').value = result.data.luongCoBan;
        document.querySelector('#soGioLam').value = result.data.soGioLamTrongThang;
    })

    promise.catch(function (error) {
        console.log(error);
    })
}

document.querySelector('#btnLuuThongTin').onclick = function () {


    var tiepTucChay = true;

    tiepTucChay &= validation.kiemTraTatCaLaKyTu(document.querySelector('#tenNhanVien').value, 'Tên nhân viên', '#kiemTraTenNhanVien') & validation.kiemTraGiaTri(document.querySelector('#luongCoBan').value, 'Lương cơ bản', '#kiemTraLuongCoBan', 1000000, 20000000) & validation.kiemTraGiaTri(document.querySelector('#soGioLam').value, 'Số giờ làm trong tháng', '#kiemTraSoGioLam', 50, 150);

    if (!tiepTucChay) {
        return;
    }

    var nv = new NhanVien();
    nv.maNhanVien = document.querySelector('#maNhanVien').value;
    nv.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nv.heSoChucVu = document.querySelector('#chucVu').value;
    nv.luongCoBan = document.querySelector('#luongCoBan').value;
    nv.soGioLamTrongThang = document.querySelector('#soGioLam').value;
    var mangOption = document.querySelector('#chucVu').options;
    var viTriOptionChon = document.querySelector('#chucVu').selectedIndex;
    nv.chucVu = mangOption[viTriOptionChon].innerHTML;


    var promise = qlnvsv.capNhatThongTinNhanVien(nv);

    promise.then(function (result) {
        layDuLieu();
        document.querySelector('#btnThemNhanVien').disabled = false;
        document.querySelector('#btnLuuThongTin').disabled = true;
        document.querySelector('#maNhanVien').disabled = false;

        document.querySelector('#maNhanVien').value = '';
        document.querySelector('#tenNhanVien').value = '';
        document.querySelector('#chucVu').value = 3;
        document.querySelector('#luongCoBan').value = '';
        document.querySelector('#soGioLam').value = '';
    })

    promise.catch(function(error){
        console.log(error);
    })
}

layDuLieu();