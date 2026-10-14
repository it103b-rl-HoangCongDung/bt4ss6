/**
 * Môn học: [RL-IT103B-K25] - Xây dựng ứng dụng web với Javascript
 * Bài tập: Bài 4 - Session 6 - Xây dựng Hệ thống Xử lý Chuỗi Dữ liệu Kiểm kê & Quản trị Kho Thể hình
 * Tác giả: Hoang Cong Dung (it103b-rl-HoangCongDung)
 * 
 * TEST CASES KIỂM THỬ:
 * - Case 1 (Chuẩn): DUMBBELL:20#BARBELL:15#TREADMILL:05#MAT:40
 * - Case 2 (Thiết bị tồn kho thấp): TREADMILL:03#MAT:08
 * - Case 3 (Chuỗi trống): ""
 */

// Khởi tạo biến lưu dữ liệu kho thô
let rawInventoryData = 'DUMBBELL:20#BARBELL:15#TREADMILL:05#MAT:40';

// Hàm bóc tách và đếm tổng số lượng thiết bị
function parseAndCountInventory(dataStr) {
    if (!dataStr || dataStr.trim() === '') {
        console.log('Cảnh báo: Chuỗi dữ liệu kiểm kê đang trống!');
        return;
    }

    console.log('\n=== BÁO CÁO BÓC TÁCH DỮ LIỆU KIỂM KÊ ===');
    let currentIndex = 0;
    let totalQuantity = 0;

    while (currentIndex < dataStr.length) {
        // Tìm vị trí dấu ':' phân cách tên và số lượng
        let colonIndex = dataStr.indexOf(':', currentIndex);
        if (colonIndex === -1) break;

        let equipmentName = dataStr.slice(currentIndex, colonIndex);

        // Tìm vị trí dấu '#' phân cách các bản ghi
        let hashIndex = dataStr.indexOf('#', colonIndex);
        let quantityStr = '';

        if (hashIndex === -1) {
            // Bản ghi cuối cùng không có dấu '#'
            quantityStr = dataStr.slice(colonIndex + 1);
            currentIndex = dataStr.length;
        } else {
            quantityStr = dataStr.slice(colonIndex + 1, hashIndex);
            currentIndex = hashIndex + 1;
        }

        let quantity = Number(quantityStr);
        totalQuantity += quantity;

        // Kiểm tra cảnh báo tồn kho dưới 10
        let warningFlag = quantity < 10 ? ' [CẦN BẢO TRÌ/BỔ SUNG]' : '';
        console.log('- Thiết bị: ' + equipmentName + ' | Số lượng: ' + quantity + warningFlag);
    }

    console.log('--> Tổng số lượng thiết bị hiện có trong kho: ' + totalQuantity);
}

// Hàm chuẩn hóa mã định danh thiết bị
function normalizeInventoryCodes(dataStr) {
    if (!dataStr || dataStr.trim() === '') {
        console.log('Cảnh báo: Không có dữ liệu để chuẩn hóa!');
        return '';
    }

    let standardized = dataStr
        .replaceAll('DUMBBELL', 'EQ-DB')
        .replaceAll('BARBELL', 'EQ-BB')
        .replaceAll('TREADMILL', 'EQ-TM')
        .replaceAll('MAT', 'EQ-MT');

    console.log('\n=== CHUẨN HÓA MÃ ĐỊNH DANH ===');
    console.log('Mã gốc: ' + dataStr);
    console.log('Mã mới : ' + standardized);
    return standardized;
}

// Hàm xuất báo cáo kiểm kê dạng bảng căn lề
function printInventoryReport(dataStr) {
    if (!dataStr || dataStr.trim() === '') {
        console.log('Cảnh báo: Không thể vẽ bảng do chuỗi trống!');
        return;
    }

    console.log('\n' + '='.repeat(45));
    console.log('| ' + 'BÁO CÁO KIỂM KÊ KHO THỂ HÌNH'.padEnd(41) + ' |');
    console.log('='.repeat(45));
    console.log('| ' + 'TÊN THIẾT BỊ'.padEnd(25) + ' | ' + 'SỐ LƯỢNG'.padStart(11) + ' |');
    console.log('-'.repeat(45));

    let currentIndex = 0;
    while (currentIndex < dataStr.length) {
        let colonIndex = dataStr.indexOf(':', currentIndex);
        if (colonIndex === -1) break;

        let equipmentName = dataStr.slice(currentIndex, colonIndex);
        let hashIndex = dataStr.indexOf('#', colonIndex);
        let quantityStr = '';

        if (hashIndex === -1) {
            quantityStr = dataStr.slice(colonIndex + 1);
            currentIndex = dataStr.length;
        } else {
            quantityStr = dataStr.slice(colonIndex + 1, hashIndex);
            currentIndex = hashIndex + 1;
        }

        let paddedName = equipmentName.padEnd(25, ' ');
        let paddedQty = quantityStr.padStart(11, ' ');

        console.log('| ' + paddedName + ' | ' + paddedQty + ' |');
    }
    console.log('='.repeat(45));
}

// Chạy thử nghiệm các chức năng
parseAndCountInventory(rawInventoryData);
let normalizedData = normalizeInventoryCodes(rawInventoryData);
printInventoryReport(normalizedData);
