import Phaser from 'phaser';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xbvwvibzmpztwpcuiury.supabase.co';
const SUPABASE_KEY = 'sb_publishable_OZMtzpBZr3SqHL5qubR2LA_7O4RVRgo';
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const CONFIG = {
    TILE_WIDTH: 220,
    TILE_HEIGHT: 110,
    GRID_SIZE: 11,
    START_MONEY: 200,
    START_ECO_POINTS: 100,
    CLEAN_RATE_MULTIPLIER: 0.02,
    MAX_BUILDING_LEVEL: 5,
    UPGRADE_COST_MULTIPLIER: 1.5,
    UPGRADE_OUTPUT_MULTIPLIER: 0.75,
    PLAYER_SPEED: 400,
    PLAYER_BOUNDARY_MARGIN: 0.35,
    MAX_TRASH_ALLOWED: 48
};

const TRASH_TYPES = [
    { type: 'organic', key: 'trash_organic', variants: ['single_trash_apple_core', 'single_trash_banana_peel'], name: 'Rác Hữu Cơ', desc: 'Thức ăn thừa, lá cây... Phân hủy tự nhiên nhưng sinh mầm bệnh và mùi hôi nếu không ủ. Có thể ủ thành phân xanh sinh học.' },
    { type: 'plastic', key: 'trash_plastic', variants: ['single_trash_plastic_bottle'], name: 'Rác Nhựa', desc: 'Chai lọ, túi nilon, ly nhựa... Mất hàng trăm năm để phân hủy. Gây ô nhiễm đất và làm hại sinh vật biển nếu không được tái chế.' },
    { type: 'metal', key: 'trash_metal', variants: ['single_trash_battery_aa', 'single_trash_soda_can'], name: 'Rác Kim Loại', desc: 'Vỏ lon, phế liệu công nghiệp... Dễ rỉ sét làm rò rỉ hóa chất độc hại vào đất và nước. Cần tách chiết để nấu chảy tái sử dụng.' },
    { type: 'electronic', key: 'single_trash_circuit_board_broken', variants: ['single_trash_circuit_board_broken'], name: 'Rác Điện Tử', desc: 'Thiết bị hỏng, bo mạch... Chứa kim loại nặng cực kỳ độc hại. Cần quy trình tái chế đặc biệt phức tạp.' }
];

const ROBOT_UPGRADES = [
    { id: 'speed', name: 'Tốc Độ Robot', levels: [400, 500, 600, 750], costs: [0, 500, 1500, 3000] },
    { id: 'capacity', name: 'Sức Chứa Rác', levels: [1, 2, 3, 5], costs: [0, 800, 2000, 4000] }
];

const QUIZ_QUESTIONS = [
    // === CÂU HỎI GỐC (7 câu) ===
    { q: "Khí nhà kính nào có khả năng giữ nhiệt mạnh nhất?", options: ["CO2", "Methane (CH4)", "CFCs", "N2O"], ans: 2 },
    { q: "Hiệp định Paris về biến đổi khí hậu nhằm mục tiêu giữ mức tăng nhiệt độ toàn cầu dưới bao nhiêu độ C?", options: ["1.5°C", "2.0°C", "2.5°C", "3.0°C"], ans: 1 },
    { q: "Hiện tượng 'tẩy trắng san hô' chủ yếu do nguyên nhân nào?", options: ["Ô nhiễm nhựa", "Nhiệt độ nước biển tăng", "Đánh bắt quá mức", "Rò rỉ dầu"], ans: 1 },
    { q: "Tài nguyên nào sau đây không thể tái tạo?", options: ["Đất canh tác", "Nước ngọt", "Than đá", "Rừng nguyên sinh"], ans: 2 },
    { q: "Công nghệ 'Thu hồi và lưu trữ carbon' (CCS) nhằm mục đích gì?", options: ["Lọc nước biển", "Tái chế nhựa", "Giảm phát thải CO2", "Tạo năng lượng gió"], ans: 2 },
    { q: "Rác thải điện tử (E-waste) chứa nhiều kim loại nặng độc hại nào sau đây?", options: ["Sắt và Nhôm", "Đồng và Kẽm", "Chì và Thủy ngân", "Canxi và Kali"], ans: 2 },
    { q: "Hạt vi nhựa (Microplastics) có kích thước dưới bao nhiêu mm?", options: ["5mm", "10mm", "1mm", "20mm"], ans: 0 },

    // === CÁC LOẠI RÁC (5 câu) ===
    { q: "Rác hữu cơ là loại rác nào sau đây?", options: ["Chai nhựa, túi nilon", "Thức ăn thừa, vỏ trái cây", "Pin cũ, bóng đèn hỏng", "Bo mạch, dây điện"], ans: 1 },
    { q: "Loại rác nào mất thời gian phân hủy tự nhiên lâu nhất?", options: ["Vỏ chuối (2-5 tuần)", "Giấy báo (2-6 tuần)", "Chai nhựa (450-1000 năm)", "Vỏ lon nhôm (80-200 năm)"], ans: 2 },
    { q: "Rác thải y tế (kim tiêm, bông băng dính máu) thuộc loại rác gì?", options: ["Rác sinh hoạt thông thường", "Rác tái chế", "Rác thải nguy hại", "Rác hữu cơ"], ans: 2 },
    { q: "Pin đã qua sử dụng nên được xử lý như thế nào?", options: ["Vứt chung với rác sinh hoạt", "Thu gom riêng tại điểm thu hồi", "Chôn lấp dưới đất", "Đốt cùng rác thông thường"], ans: 1 },
    { q: "Loại rác nào sau đây có thể ủ thành phân compost?", options: ["Túi nilon", "Vỏ rau, lá cây, vỏ trứng", "Chai thủy tinh", "Hộp xốp đựng thức ăn"], ans: 1 },

    // === KHÍ Ô NHIỄM (5 câu) ===
    { q: "Khí SO₂ (lưu huỳnh dioxide) là nguyên nhân chính gây ra hiện tượng gì?", options: ["Hiệu ứng nhà kính", "Mưa axit", "Thủng tầng ozone", "Sương mù quang hóa"], ans: 1 },
    { q: "Khí CO (carbon monoxide) gây nguy hiểm cho con người vì?", options: ["Gây kích ứng da", "Làm mất thính giác", "Gắn kết với hemoglobin, gây ngạt", "Gây đau dạ dày"], ans: 2 },
    { q: "Tầng ozone trong khí quyển bị phá hủy chủ yếu bởi chất nào?", options: ["CO₂", "SO₂", "CFCs (Chlorofluorocarbons)", "CH₄ (Methane)"], ans: 2 },
    { q: "Khí NO₂ (nitrogen dioxide) chủ yếu phát ra từ nguồn nào?", options: ["Cây xanh quang hợp", "Khói xe cơ giới và nhà máy", "Núi lửa phun trào", "Ao hồ tự nhiên"], ans: 1 },
    { q: "PM2.5 là gì?", options: ["Một loại khí nhà kính", "Hạt bụi mịn có đường kính ≤ 2.5 micromet", "Tên một hóa chất công nghiệp", "Chỉ số đo nhiệt độ không khí"], ans: 1 },

    // === PHƯƠNG ÁN XỬ LÝ RÁC (5 câu) ===
    { q: "Nguyên tắc 3R trong bảo vệ môi trường là gì?", options: ["Reduce, Reuse, Recycle", "Remove, Replace, Restore", "Reject, Repair, Return", "Reduce, Repair, Rebuild"], ans: 0 },
    { q: "Phương pháp xử lý rác hữu cơ thân thiện với môi trường nhất là gì?", options: ["Đốt bỏ", "Chôn lấp trực tiếp", "Ủ phân sinh học (compost)", "Thả xuống biển"], ans: 2 },
    { q: "Chôn lấp rác không hợp vệ sinh có thể gây ra hậu quả gì?", options: ["Tăng độ phì nhiêu đất", "Ô nhiễm nước ngầm", "Tạo ra năng lượng sạch", "Giảm hiệu ứng nhà kính"], ans: 1 },
    { q: "Lò đốt rác công nghiệp hiện đại cần có thiết bị gì để giảm ô nhiễm?", options: ["Quạt gió công suất lớn", "Hệ thống lọc khí thải", "Máy phát điện diesel", "Bể chứa nước thải"], ans: 1 },
    { q: "Tái chế 1 tấn giấy có thể cứu được khoảng bao nhiêu cây xanh?", options: ["5 cây", "10 cây", "17 cây", "30 cây"], ans: 2 },

    // === BẢO VỆ MÔI TRƯỜNG (5 câu) ===
    { q: "Rừng Amazon thường được gọi là gì?", options: ["Kho vàng xanh", "Lá phổi xanh của Trái Đất", "Vườn địa đàng", "Rừng ma thuật"], ans: 1 },
    { q: "Nguồn năng lượng tái tạo nào được sử dụng phổ biến nhất trên thế giới?", options: ["Năng lượng gió", "Năng lượng mặt trời", "Thủy điện", "Năng lượng địa nhiệt"], ans: 2 },
    { q: "Một chiếc túi nilon mất khoảng bao lâu để phân hủy trong tự nhiên?", options: ["1-5 năm", "10-50 năm", "100-200 năm", "500-1000 năm"], ans: 3 },
    { q: "Ngày Môi trường Thế giới được tổ chức vào ngày nào hàng năm?", options: ["22 tháng 4", "5 tháng 6", "16 tháng 9", "1 tháng 12"], ans: 1 },
    { q: "Biện pháp nào hiệu quả nhất để giảm phát thải khí nhà kính trên quy mô toàn cầu?", options: ["Trồng thêm cây xanh", "Hạn chế sử dụng điều hòa", "Chuyển đổi sang năng lượng tái tạo", "Giảm sử dụng túi nilon"], ans: 2 }
];

const DECOR_TYPES = [
    { key: 'tree_of_life', name: 'Cây Đời', costEco: 300 },
    { key: 'green_tree', name: 'Cây Xanh', costEco: 50 },
    { key: 'nice_house', name: 'Nhà Sinh Thái', costEco: 200 },
    { key: 'eco_bus', name: 'Xe Buýt Sinh Thái', costEco: 400 },
    { key: 'eco_ship', name: 'Tàu Thu Gom Rác', costEco: 600 }
];

const BUILDING_TYPES = [
    { key: 'solar_panel', name: 'Pin Mặt Trời', cost: 100, cleanRate: 0.5, incomeRate: 0.5, ecoRate: 0.5, isProcessor: false, unlockReq: null },
    { key: 'wind_turbine', name: 'Tua-bin Gió', cost: 200, cleanRate: 1, incomeRate: 1, ecoRate: 1.0, isProcessor: false, unlockReq: null },
    { key: 'greenhouse', name: 'TT Nghiên Cứu', cost: 300, cleanRate: 1.5, incomeRate: 1.5, ecoRate: 2.0, isProcessor: false, unlockReq: null },
    { key: 'organic_composter_l1', name: 'Máy Ủ Phân', cost: 800, cleanRate: 3.0, incomeRate: 1.0, ecoRate: 1.0, isProcessor: true, processType: 'organic', unlockReq: null, maxKey: 'organic_composter_max_new' },
    { key: 'plastic_recycler_l1', name: 'Tái Chế Nhựa', cost: 1200, cleanRate: 4.5, incomeRate: 1.5, ecoRate: 1.5, isProcessor: true, processType: 'plastic', unlockReq: 'plastic', maxKey: 'plastic_recycler_max' },
    { key: 'metal_recycler_l1', name: 'Tái Chế Kim Loại', cost: 2500, cleanRate: 7.0, incomeRate: 2.5, ecoRate: 2.0, isProcessor: true, processType: 'metal', unlockReq: 'metal', maxKey: 'metal_recycler_max_new' },
    { key: 'circuit_recycler_l1', name: 'Tái Chế Điện Tử', cost: 2200, cleanRate: 8.0, incomeRate: 3.5, ecoRate: 3.0, isProcessor: true, processType: 'electronic', unlockReq: 'electronic', maxKey: 'circuit_recycler_max' }
];

const MAP_THEMES = [
    {
        id: 'tropical',
        name: 'Đảo Nhiệt Đới',
        desc: 'Hòn đảo khởi đầu với Cây Sinh Mệnh đang héo mòn. Hãy hồi sinh cái cây để cứu lấy hòn đảo.',
        textures: { polluted: 'island_tropical_new_polluted', recovery: 'island_tropical_new_recovery', thriving: 'island_tropical_new_thriving', clean: 'island_tropical_new_clean' }
    },
    {
        id: 'cyber',
        name: 'Đảo Công Nghệ Cao',
        desc: 'Một trung tâm năng lượng tương lai bị bỏ hoang. Hãy khôi phục lõi năng lượng trung tâm để hồi sinh hòn đảo.',
        textures: { polluted: 'island_cyber_polluted', recovery: 'island_cyber_recovery', thriving: 'island_cyber_thriving', clean: 'island_cyber_clean' }
    },
    {
        id: 'arctic',
        name: 'Thành Phố Công Nghệ',
        desc: 'Một hòn đảo đô thị công nghệ cao với không gian mở rộng lớn để xây dựng hệ thống tái chế.',
        textures: { polluted: 'island_tech_polluted', recovery: 'island_tech_recovery', thriving: 'island_tech_thriving', clean: 'island_tech_clean' }
    },
    {
        id: 'ecopolis',
        name: 'Thành Phố Sinh Thái',
        desc: 'Một đô thị tương lai bị ô nhiễm nặng nề, cần được phục hồi thành thiên đường xanh.',
        textures: { polluted: 'island_ecopolis_polluted', recovery: 'island_ecopolis_recovery', thriving: 'island_ecopolis_thriving', clean: 'island_ecopolis_clean' }
    }
];

const TECH_TREE = [
    { id: 'organic', name: 'Ủ Phân Sinh Học', costEco: 300, desc: 'Mở khóa máy ủ phân hữu cơ hiệu suất cao.', req: null },
    { id: 'plastic', name: 'Tái Chế Nhựa', costEco: 800, desc: 'Mở khóa máy tái chế nhựa công nghệ cao.', req: 'organic' },
    { id: 'metal', name: 'Luyện Kim Khép Kín', costEco: 1500, desc: 'Mở khóa xưởng luyện kim loại xanh.', req: 'plastic' },
    { id: 'electronic', name: 'Xử Lý E-Waste', costEco: 2000, desc: 'Mở khóa trung tâm tái chế rác điện tử tiên tiến.', req: 'metal' }
];

class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        // Load visual assets
        this.load.image('login_bg', 'assets/login_background.webp');
        this.load.image('mode_selection_bg', 'assets/mode_selection_bg.webp');
        this.load.image('level_select_bg', 'assets/level_select_bg.webp');
        this.load.image('solar_panel', 'assets/solar_panel.webp');
        this.load.image('wind_turbine', 'assets/wind_turbine.webp');
        this.load.image('greenhouse', 'assets/greenhouse.webp');
        this.load.image('organic_composter_l1', 'assets/organic_composter_l1.webp');
        this.load.image('organic_composter_l2', 'assets/organic_composter_l2.webp');
        this.load.image('organic_composter_l3', 'assets/organic_composter_l3.webp');
        this.load.image('organic_composter_max_new', 'assets/organic_composter_max_new.webp');
        this.load.image('metal_recycler_l1', 'assets/metal_recycler_l1.webp');
        this.load.image('metal_recycler_l2', 'assets/metal_recycler_l2.webp');
        this.load.image('metal_recycler_l3', 'assets/metal_recycler_l3.webp');
        this.load.image('metal_recycler_max_new', 'assets/metal_recycler_max_new.webp');
        this.load.image('circuit_recycler_l1', 'assets/circuit_recycler_l1.webp');
        this.load.image('circuit_recycler_l2', 'assets/circuit_recycler_l2.webp');
        this.load.image('circuit_recycler_l3', 'assets/circuit_recycler_l3.webp');
        this.load.image('circuit_recycler_max', 'assets/circuit_recycler_max.webp');
        this.load.image('trash_organic', 'assets/trash_organic_v2.webp');
        this.load.image('trash_plastic', 'assets/trash_plastic_v2.webp');
        this.load.image('trash_metal', 'assets/trash_metal_v2.webp');
        this.load.image('single_trash_apple_core', 'assets/single_trash_apple_core.webp');
        this.load.image('single_trash_banana_peel', 'assets/single_trash_banana_peel.webp');
        this.load.image('single_trash_plastic_bottle', 'assets/single_trash_plastic_bottle.webp');
        this.load.image('single_trash_battery_aa', 'assets/single_trash_battery_aa.webp');
        this.load.image('single_trash_soda_can', 'assets/single_trash_soda_can.webp');
        this.load.image('single_trash_circuit_board_broken', 'assets/single_trash_circuit_board_broken.webp');
        this.load.image('green_tree', 'assets/green_tree.webp');
        this.load.image('nice_house', 'assets/nice_house.webp');
        this.load.image('tree_of_life', 'assets/tree_of_life.webp');
        this.load.image('industrial_worker_robot', 'assets/industrial_worker_robot.webp');
        this.load.image('plastic_recycler_l1', 'assets/plastic_recycler_l1_new.webp');
        this.load.image('plastic_recycler_l2', 'assets/plastic_recycler_l2_new.webp');
        this.load.image('plastic_recycler_l3', 'assets/plastic_recycler_l3_new.webp');
        this.load.image('plastic_recycler_max', 'assets/plastic_recycler_max_new_v2.webp');
        this.load.image('worker_robot', 'assets/worker_robot.webp');
        this.load.image('worker_robot_l2', 'assets/worker_robot_l2.webp');
        this.load.image('worker_robot_l3', 'assets/worker_robot_l3.webp');
        this.load.image('prof_eco', 'assets/prof_eco.webp');
        this.load.image('industrial_robot', 'assets/industrial_robot.webp');
        this.load.image('worker_robot_l3', 'assets/worker_robot_l3.webp');
        this.load.image('robot_skin_panda', 'assets/robot_skin_panda.webp');
        this.load.image('robot_skin_mecha', 'assets/robot_skin_mecha.webp');
        this.load.image('island_tropical_new_polluted', 'assets/island_tropical_new_polluted.webp');
        this.load.image('island_tropical_new_recovery', 'assets/island_tropical_new_recovery.webp');
        this.load.image('island_tropical_new_thriving', 'assets/island_tropical_new_thriving.webp');
        this.load.image('island_tropical_new_clean', 'assets/island_tropical_new_clean.webp');
        this.load.image('island_cyber_polluted', 'assets/island_cyber_polluted.webp');
        this.load.image('island_cyber_recovery', 'assets/island_cyber_recovery.webp');
        this.load.image('island_cyber_thriving', 'assets/island_cyber_thriving.webp');
        this.load.image('island_cyber_clean', 'assets/island_cyber_clean.webp');
        this.load.image('island_ecopolis_polluted', 'assets/island_ecopolis_polluted.webp');
        this.load.image('island_ecopolis_recovery', 'assets/island_ecopolis_recovery.webp');
        this.load.image('island_ecopolis_thriving', 'assets/island_ecopolis_thriving.webp');
        this.load.image('island_ecopolis_clean', 'assets/island_ecopolis_clean.webp');
        this.load.image('island_tech_polluted', 'assets/island_tech_polluted.webp');
        this.load.image('island_tech_recovery', 'assets/island_tech_recovery.webp');
        this.load.image('island_tech_thriving', 'assets/island_tech_thriving.webp');
        this.load.image('island_tech_clean', 'assets/island_tech_clean.webp');
        this.load.image('bin_organic', 'assets/bin_organic.webp');
        this.load.image('bin_plastic', 'assets/bin_plastic.webp');
        this.load.image('bin_metal', 'assets/bin_metal.webp');
        this.load.image('bin_electronic', 'assets/bin_electronic.webp');
        this.load.image('eco_ship', 'assets/eco_ship.webp');
        this.load.image('eco_bus', 'assets/eco_bus.webp');
        this.load.image('oil_spill', 'assets/oil_spill.webp');
        this.load.image('sea_plastic_trash', 'assets/sea_plastic_trash.webp');

        // Load audio assets
        this.load.audio('main_theme', 'assets/audio/main_theme.mp3');
        this.load.audio('build_sfx', 'assets/audio/build_sfx.mp3');
        this.load.audio('clean_progress_sfx', 'assets/audio/clean_progress_sfx.mp3');
        this.load.audio('organic_process_sfx', 'assets/audio/organic_process_sfx.mp3');
        this.load.audio('plastic_process_sfx', 'assets/audio/plastic_process_sfx.mp3');
        this.load.audio('metal_process_sfx', 'assets/audio/metal_process_sfx.mp3');
        this.load.audio('electronic_process_sfx', 'assets/audio/electronic_process_sfx.mp3');

        // Progress text
        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;
        const progressText = this.add.text(cx, cy, 'Loading...', { font: '24px Inter', fill: '#ffffff' }).setOrigin(0.5);
        this.load.on('progress', (value) => {
            progressText.setText(`Loading... ${Math.floor(value * 100)}%`);
        });
    }

    create() {
        this.scene.start('LoginScene');
    }
}

class LoginScene extends Phaser.Scene {
    constructor() { super('LoginScene'); }

    async create() {
        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        // Background
        const bg = this.add.image(cx, cy, 'login_bg').setOrigin(0.5);

        // Scale background to fit screen
        const scaleX = this.cameras.main.width / bg.width;
        const scaleY = this.cameras.main.height / bg.height;
        const scale = Math.max(scaleX, scaleY);
        bg.setScale(scale);

        // Dark overlay to make text readable
        this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.4).setOrigin(0);

        // Title and UI
        this.add.text(cx, cy - 120, 'ECO-TYCOON', { font: 'bold 64px Inter', fill: '#32cd32', stroke: '#000000', strokeThickness: 6 }).setOrigin(0.5);
        this.add.text(cx, cy - 50, 'Hành Trình Phủ Xanh Trái Đất', { font: 'italic 24px Inter', fill: '#ffffff', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5);

        // Check existing session
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            this.handleSuccessfulAuth(session.user);
            return;
        }

        const formHTML = `
            <div id="auth-box" style="background: rgba(20, 35, 44, 0.95); padding: 30px; border-radius: 12px; border: 2px solid #4682b4; width: 320px; color: white; font-family: Inter, sans-serif; display: flex; flex-direction: column; gap: 15px; box-sizing: border-box; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                <h2 id="auth-title" style="margin: 0 0 10px 0; text-align: center; color: #ffcc00; font-size: 24px;">ĐĂNG NHẬP</h2>
                
                <div style="display: flex; flex-direction: column; gap: 5px;">
                    <label style="font-size: 14px; font-weight: bold;">Email</label>
                    <input type="email" id="supa-email" style="padding: 10px; border-radius: 6px; border: none; font-size: 16px; outline: none; background: #fff; color: #000;" placeholder="Nhập email..." />
                </div>

                <div id="username-container" style="display: none; flex-direction: column; gap: 5px;">
                    <label style="font-size: 14px; font-weight: bold;">Tên hiển thị</label>
                    <input type="text" id="supa-user" style="padding: 10px; border-radius: 6px; border: none; font-size: 16px; outline: none; background: #fff; color: #000;" placeholder="Nhập tên nhân vật..." />
                </div>

                <div style="display: flex; flex-direction: column; gap: 5px;">
                    <label style="font-size: 14px; font-weight: bold;">Mật khẩu</label>
                    <input type="password" id="supa-pass" style="padding: 10px; border-radius: 6px; border: none; font-size: 16px; outline: none; background: #fff; color: #000;" placeholder="Nhập mật khẩu..." />
                </div>

                <div id="supa-error" style="color: #ff4444; font-size: 13px; text-align: center; min-height: 20px; font-weight: bold;"></div>

                <div style="display: flex; gap: 10px; margin-top: 10px;">
                    <button id="supa-btn-action" style="flex: 1; padding: 12px; background: #32cd32; color: white; border: none; border-radius: 6px; font-weight: bold; font-size: 16px; cursor: pointer;">Đăng Nhập</button>
                </div>
                
                <div style="text-align: center; margin-top: 10px;">
                    <a href="#" id="supa-toggle-mode" style="color: #9ee9ff; text-decoration: none; font-size: 14px; font-weight: bold;">Chưa có tài khoản? Đăng ký ngay</a>
                </div>

                <div style="text-align: center; margin-top: 15px;">
                    <a href="#" id="supa-btn-close" style="color: #aaaaaa; text-decoration: none; font-size: 14px;">Đóng</a>
                </div>
            </div>
        `;

        this.loginForm = this.add.dom(cx, cy + 40).createFromHTML(formHTML).setVisible(false);
        let isLoginMode = true;

        this.loginForm.addListener('click');
        this.loginForm.on('click', async (e) => {
            const errorDiv = document.getElementById('supa-error');
            if (e.target.id === 'supa-btn-close') {
                e.preventDefault();
                this.loginForm.setVisible(false);
                errorDiv.innerText = '';
            } else if (e.target.id === 'supa-toggle-mode') {
                e.preventDefault();
                isLoginMode = !isLoginMode;
                document.getElementById('auth-title').innerText = isLoginMode ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ';
                document.getElementById('supa-btn-action').innerText = isLoginMode ? 'Đăng Nhập' : 'Đăng Ký';
                document.getElementById('supa-toggle-mode').innerText = isLoginMode ? 'Chưa có tài khoản? Đăng ký ngay' : 'Đã có tài khoản? Đăng nhập';
                document.getElementById('username-container').style.display = isLoginMode ? 'none' : 'flex';
                errorDiv.innerText = '';
            } else if (e.target.id === 'supa-btn-action') {
                e.preventDefault();
                const email = document.getElementById('supa-email').value;
                const password = document.getElementById('supa-pass').value;
                const username = document.getElementById('supa-user').value;

                if (!email || !password || (!isLoginMode && !username)) {
                    errorDiv.innerText = 'Vui lòng điền đầy đủ thông tin!';
                    return;
                }

                document.getElementById('supa-btn-action').disabled = true;
                document.getElementById('supa-btn-action').innerText = 'Đang xử lý...';
                errorDiv.innerText = '';

                try {
                    if (isLoginMode) {
                        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                        if (error) throw error;
                        await this.handleSuccessfulAuth(data.user);
                    } else {
                        const { data, error } = await supabase.auth.signUp({
                            email,
                            password,
                            options: { data: { username } }
                        });
                        if (error) throw error;

                        // If no session is returned, email confirmation is required
                        if (!data.session) {
                            errorDiv.innerText = 'Đăng ký thành công! Kiểm tra email để xác nhận.';
                            document.getElementById('supa-btn-action').disabled = false;
                            document.getElementById('supa-btn-action').innerText = 'Đăng Ký';
                            return;
                        }
                        await this.handleSuccessfulAuth(data.user);
                    }
                } catch (err) {
                    console.error(err);
                    let displayError = err.message || 'Có lỗi xảy ra!';
                    if (err.message === 'Invalid login credentials') {
                        displayError = 'Email hoặc mật khẩu không đúng!';
                    } else if (err.message === 'Email signups are disabled') {
                        displayError = 'Lỗi: Tính năng đăng ký bằng Email đang bị tắt trên Supabase!';
                    } else if (err.message === 'User already registered') {
                        displayError = 'Email này đã được đăng ký!';
                    }
                    errorDiv.innerText = displayError;
                    document.getElementById('supa-btn-action').disabled = false;
                    document.getElementById('supa-btn-action').innerText = isLoginMode ? 'Đăng Nhập' : 'Đăng Ký';
                }
            }
        });

        // Open Auth Button
        const btnLogin = this.add.graphics();
        btnLogin.fillStyle(0x4682b4, 1);
        btnLogin.fillRoundedRect(cx - 150, cy + 30, 300, 50, 10);
        this.add.text(cx, cy + 55, 'ĐĂNG NHẬP / ĐĂNG KÝ', { font: 'bold 18px Inter', fill: '#fff' }).setOrigin(0.5);
        this.add.rectangle(cx, cy + 55, 300, 50, 0x0, 0).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.loginForm.setVisible(true));

        // Mock Guest Button
        const btnGuest = this.add.graphics();
        btnGuest.fillStyle(0x555555, 1);
        btnGuest.fillRoundedRect(cx - 150, cy + 100, 300, 50, 10);
        this.add.text(cx, cy + 125, 'CHẾ ĐỘ KHÁCH', { font: 'bold 18px Inter', fill: '#fff' }).setOrigin(0.5);
        this.add.rectangle(cx, cy + 125, 300, 50, 0x0, 0).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                localStorage.setItem('eco_username', 'Guest_' + Math.floor(Math.random() * 1000));
                this.scene.start('MainMenuScene');
            });
    }

    async handleSuccessfulAuth(user) {
        let username = user.user_metadata?.username || user.email.split('@')[0];
        try {
            // Do not use .single() here to avoid 406 network errors in console when row doesn't exist
            const { data: players, error: fetchError } = await supabase
                .from('players')
                .select('*')
                .eq('id', user.id);

            // Handle relation not found (400)
            if (fetchError) {
                if (fetchError.code === '42P01' || fetchError.message.includes('relation "public.players" does not exist')) {
                    console.warn("Table 'players' does not exist yet. Please create it in Supabase.");
                } else {
                    console.warn("Error fetching player data:", fetchError);
                }
            } else if (players && players.length === 0) {
                // User not found, create new record
                const { error: insertError } = await supabase
                    .from('players')
                    .insert([{ id: user.id, username: username, eco_score: 0 }]);

                if (insertError) {
                    console.warn("Could not insert into players table:", insertError);
                }
            } else if (players && players.length > 0) {
                username = players[0].username || username;
            }
        } catch (e) {
            console.warn('Error reading from players table, skipping DB integration:', e);
        }

        localStorage.setItem('eco_username', username);
        localStorage.setItem('eco_userid', user.id);
        this.scene.start('MainMenuScene');
    }
}

class MainMenuScene extends Phaser.Scene {
    constructor() { super('MainMenuScene'); }

    create() {
        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        // Background
        const bg = this.add.image(cx, cy, 'mode_selection_bg').setOrigin(0.5);

        // Scale background to fit screen
        const scaleX = this.cameras.main.width / bg.width;
        const scaleY = this.cameras.main.height / bg.height;
        const scale = Math.max(scaleX, scaleY);
        bg.setScale(scale);

        // Dark overlay to make text readable
        this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.5).setOrigin(0);

        const username = localStorage.getItem('eco_username') || 'Guest';
        this.add.text(cx, cy - 140, `Xin chào, ${username}!`, { font: 'bold 24px Inter', fill: '#ffffff', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5);
        this.add.text(cx, cy - 90, 'CHỌN CHẾ ĐỘ CHƠI', { font: 'bold 36px Inter', fill: '#ffcc00', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5);

        // Single Player Button
        const btnSingle = this.add.graphics();
        btnSingle.fillStyle(0x32cd32, 0.9);
        btnSingle.fillRoundedRect(cx - 200, cy - 20, 400, 60, 10);
        this.add.text(cx, cy + 10, '👤 CHƠI ĐƠN (Thư giãn & Khám phá)', { font: 'bold 20px Inter', fill: '#fff' }).setOrigin(0.5);
        this.add.rectangle(cx, cy + 10, 400, 60, 0x0, 0).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('LevelSelectScene', { mode: 'single' }));

        // Multi Player Button
        const btnMulti = this.add.graphics();
        btnMulti.fillStyle(0xff8c00, 0.9);
        btnMulti.fillRoundedRect(cx - 250, cy + 70, 500, 60, 10);
        this.add.text(cx, cy + 100, '🌍 NHIỀU NGƯỜI CHƠI (Cạnh tranh thu gom rác)', { font: 'bold 20px Inter', fill: '#fff' }).setOrigin(0.5);
        this.add.rectangle(cx, cy + 100, 500, 60, 0x0, 0).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('LevelSelectScene', { mode: 'multi' }));

        // Logout
        this.add.text(20, 20, '⬅ Đăng Xuất', { font: 'bold 16px Inter', fill: '#ff4444', stroke: '#000000', strokeThickness: 4 }).setInteractive({ useHandCursor: true })
            .on('pointerdown', async () => {
                localStorage.removeItem('eco_username');
                localStorage.removeItem('eco_userid');
                await supabase.auth.signOut();
                this.scene.start('LoginScene');
            });
    }
}

class LevelSelectScene extends Phaser.Scene {
    constructor() { super('LevelSelectScene'); }

    init(data) {
        this.gameMode = data.mode || 'single';
    }

    create() {
        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;
        const topY = 70;

        // Background
        const bg = this.add.image(cx, cy, 'level_select_bg').setOrigin(0.5);

        // Scale background to fit screen
        const scaleX = this.cameras.main.width / bg.width;
        const scaleY = this.cameras.main.height / bg.height;
        const scale = Math.max(scaleX, scaleY);
        bg.setScale(scale);

        // Overlay for readability
        this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.4).setOrigin(0);

        this.add.text(cx, topY, 'CHỌN BẢN ĐỒ', { font: 'bold 36px Inter', fill: '#ffcc00', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5);
        this.add.text(cx, topY + 45,
            this.gameMode === 'multi' ? '🌍 Chế độ Nhiều Người Chơi' : '👤 Chế độ Chơi Đơn',
            { font: '18px Inter', fill: '#9cff75', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5);

        const cardW = 300, cardH = 380, gap = 40;
        const totalW = MAP_THEMES.length * cardW + (MAP_THEMES.length - 1) * gap;
        const startX = cx - totalW / 2 + cardW / 2;
        const cardY = topY + 260;

        let unlockedMaps = ['tropical'];
        const uid = localStorage.getItem('eco_userid') || 'guest';
        const savedUnlocked = localStorage.getItem(`eco_unlocked_maps_${uid}`);
        if (savedUnlocked) {
            try {
                unlockedMaps = JSON.parse(savedUnlocked);
            } catch (e) {}
        }

        MAP_THEMES.forEach((theme, idx) => {
            const x = startX + idx * (cardW + gap);
            const isUnlocked = unlockedMaps.includes(theme.id);
            this.createMapCard(x, cardY, cardW, cardH, theme, isUnlocked);
        });

        // Back button
        const btnBack = this.add.graphics();
        btnBack.fillStyle(0x555555, 0.9);
        btnBack.fillRoundedRect(20, this.cameras.main.height - 60, 140, 44, 8);
        this.add.text(90, this.cameras.main.height - 38, '⬅ QUAY LẠI', { font: 'bold 16px Inter', fill: '#fff' }).setOrigin(0.5);
        this.add.rectangle(90, this.cameras.main.height - 38, 140, 44, 0x0, 0).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('MainMenuScene'));
    }

    createMapCard(x, y, w, h, theme, isUnlocked) {
        const bg = this.add.graphics();
        bg.fillStyle(0x14232c, 1);
        bg.fillRoundedRect(x - w / 2, y - h / 2, w, h, 16);
        bg.lineStyle(3, isUnlocked ? 0x4682b4 : 0x555555, 1);
        bg.strokeRoundedRect(x - w / 2, y - h / 2, w, h, 16);

        // Preview image (polluted starting state of the theme)
        const preview = this.add.image(x, y - h / 2 + 110, theme.textures.polluted).setOrigin(0.5);
        const targetW = w - 30;
        const scale = targetW / preview.width;
        preview.setScale(scale);
        
        if (!isUnlocked) {
            preview.setTint(0x555555);
        }

        // Clip preview to a rounded rect area using a mask
        const clipShape = this.make.graphics({ x: 0, y: 0, add: false });
        clipShape.fillStyle(0xffffff);
        clipShape.fillRoundedRect(x - w / 2 + 12, y - h / 2 + 12, w - 24, 190, 10);
        preview.setMask(clipShape.createGeometryMask());

        this.add.text(x, y - h / 2 + 220, isUnlocked ? theme.name : '???', { font: 'bold 22px Inter', fill: isUnlocked ? '#ffcc00' : '#888' }).setOrigin(0.5);
        this.add.text(x, y - h / 2 + 255, isUnlocked ? theme.desc : 'Đạt 100% độ sạch ở bản đồ trước để mở khóa.', {
            font: '14px Inter', fill: '#dddddd', align: 'center', wordWrap: { width: w - 30 }
        }).setOrigin(0.5, 0);

        const btnY = y + h / 2 - 40;
        const btnBg = this.add.graphics();
        btnBg.fillStyle(isUnlocked ? 0x32cd32 : 0x555555, 1);
        btnBg.fillRoundedRect(x - (w - 40) / 2, btnY - 22, w - 40, 44, 8);
        this.add.text(x, btnY, isUnlocked ? '▶ BẮT ĐẦU' : '🔒 ĐÃ KHÓA', { font: 'bold 18px Inter', fill: '#fff' }).setOrigin(0.5);
        
        if (isUnlocked) {
            this.add.rectangle(x, btnY, w - 40, 44, 0x0, 0).setInteractive({ useHandCursor: true })
                .on('pointerdown', () => {
                    if (this.gameMode === 'multi') {
                        this.scene.start('MatchmakingScene', { mapTheme: theme.id });
                    } else {
                        this.scene.start('EcoTycoon', { mode: this.gameMode, mapTheme: theme.id });
                    }
                });

            // Whole card is hoverable/clickable too for convenience
            const hitArea = this.add.rectangle(x, y, w, h, 0x0, 0).setInteractive({ useHandCursor: true });
            hitArea.on('pointerdown', () => {
                if (this.gameMode === 'multi') {
                    this.scene.start('MatchmakingScene', { mapTheme: theme.id });
                } else {
                    this.scene.start('EcoTycoon', { mode: this.gameMode, mapTheme: theme.id });
                }
            });
            hitArea.on('pointerover', () => {
                bg.clear();
                bg.fillStyle(0x1c3540, 1);
                bg.fillRoundedRect(x - w / 2, y - h / 2, w, h, 16);
                bg.lineStyle(3, 0x9cff75, 1);
                bg.strokeRoundedRect(x - w / 2, y - h / 2, w, h, 16);
            });
            hitArea.on('pointerout', () => {
                bg.clear();
                bg.fillStyle(0x14232c, 1);
                bg.fillRoundedRect(x - w / 2, y - h / 2, w, h, 16);
                bg.lineStyle(3, 0x4682b4, 1);
                bg.strokeRoundedRect(x - w / 2, y - h / 2, w, h, 16);
            });
        }
    }
}

class MatchmakingScene extends Phaser.Scene {
    constructor() { super('MatchmakingScene'); }

    init(data) {
        this.mapTheme = data.mapTheme;
    }

    create() {
        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        // Background
        const bg = this.add.image(cx, cy, 'level_select_bg').setOrigin(0.5);
        const scale = Math.max(this.cameras.main.width / bg.width, this.cameras.main.height / bg.height);
        bg.setScale(scale);
        this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.7).setOrigin(0);

        this.add.text(cx, cy - 120, 'ĐANG TÌM PHÒNG THI ĐẤU...', { font: 'bold 36px Inter', fill: '#ffcc00' }).setOrigin(0.5);
        this.statusText = this.add.text(cx, cy - 40, 'Đang kết nối máy chủ...', { font: '24px Inter', fill: '#ffffff', align: 'center' }).setOrigin(0.5);
        this.playersListText = this.add.text(cx, cy + 40, '', { font: '20px Inter', fill: '#9cff75', align: 'center' }).setOrigin(0.5);

        this.myId = Math.random().toString(36).substring(2, 10);
        this.username = localStorage.getItem('eco_username') || 'Guest_' + Math.floor(Math.random() * 1000);

        // Fixed room for now so users can find each other easily
        this.roomName = 'eco_multiplayer_lobby_v1';
        this.channel = supabase.channel(this.roomName, {
            config: {
                presence: { key: this.myId }
            }
        });

        this.players = [];

        this.channel
            .on('presence', { event: 'sync' }, () => {
                const state = this.channel.presenceState();
                this.players = [];
                for (const key in state) {
                    if (state[key][0]) {
                        this.players.push({
                            id: key,
                            username: state[key][0].username,
                            joinedAt: state[key][0].joinedAt
                        });
                    }
                }

                // Sort by ID to guarantee the EXACT same order on all clients
                this.players.sort((a, b) => a.id.localeCompare(b.id));

                this.statusText.setText(`Người chơi đang chờ: ${this.players.length} / 3`);
                this.playersListText.setText(this.players.map((p, i) => `${i + 1}. ${p.username} ${p.id === this.myId ? '(Bạn)' : ''}`).join('\n'));

                if (this.players.length >= 3) {
                    const top3 = this.players.slice(0, 3);
                    const myIndex = top3.findIndex(p => p.id === this.myId);

                    if (myIndex !== -1) {
                        this.statusText.setText('ĐÃ ĐỦ NGƯỜI! CHUẨN BỊ VÀO TRẬN...');
                        if (!this.startingMatch) {
                            this.startingMatch = true;
                            const snapshot = JSON.parse(JSON.stringify(top3));
                            const snapIdx = myIndex;
                            this.time.delayedCall(1500, () => {
                                this.scene.start('EcoTycoon', {
                                    mode: 'multi',
                                    mapTheme: this.mapTheme,
                                    roomId: this.roomName + '_' + snapshot[0].id,
                                    myIndex: snapIdx,
                                    myId: this.myId,
                                    players: snapshot
                                });
                                // Trì hoãn unsubscribe
                                setTimeout(() => {
                                    try { this.channel.unsubscribe(); } catch (e) { }
                                }, 15000);
                            });
                        }
                    } else {
                        this.statusText.setText('Phòng đã đầy! Vui lòng chờ trận sau...');
                    }
                }
            })
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    await this.channel.track({ username: this.username, joinedAt: Date.now() });

                    // Hàm kiểm tra đủ người chơi và chuyển cảnh
                    this._checkAndTransition = () => {
                        if (this.startingMatch) return;
                        const state = this.channel.presenceState();
                        const currentPlayers = [];
                        for (const key in state) {
                            if (state[key].length > 0) {
                                currentPlayers.push({
                                    id: key,
                                    username: state[key][0].username,
                                    joinedAt: state[key][0].joinedAt
                                });
                            }
                        }
                        currentPlayers.sort((a, b) => a.id.localeCompare(b.id));

                        this.statusText.setText(`Người chơi đang chờ: ${currentPlayers.length} / 3`);
                        this.playersListText.setText(currentPlayers.map((p, i) => `${i + 1}. ${p.username} ${p.id === this.myId ? '(Bạn)' : ''}`).join('\n'));

                        if (currentPlayers.length >= 3 && !this.startingMatch) {
                            const top3 = currentPlayers.slice(0, 3);
                            const myIdx = top3.findIndex(p => p.id === this.myId);
                            if (myIdx !== -1) {
                                this.startingMatch = true;
                                clearInterval(this._pollInterval);
                                document.removeEventListener('visibilitychange', this._visHandler);
                                this.statusText.setText('ĐÃ ĐỦ NGƯỜI! CHUẨN BỊ VÀO TRẬN...');

                                // Lưu snapshot danh sách người chơi
                                const snapshot = JSON.parse(JSON.stringify(top3));
                                const snapshotIdx = myIdx;

                                setTimeout(() => {
                                    // Chuyển scene TRƯỚC, KHÔNG unsubscribe ngay
                                    // để các tab khác vẫn thấy đủ 3 người
                                    this.scene.start('EcoTycoon', {
                                        mode: 'multi',
                                        mapTheme: this.mapTheme,
                                        roomId: this.roomName + '_' + snapshot[0].id,
                                        myIndex: snapshotIdx,
                                        myId: this.myId,
                                        players: snapshot
                                    });

                                    // Trì hoãn unsubscribe 15 giây để các tab nền kịp tỉnh dậy
                                    setTimeout(() => {
                                        try { this.channel.unsubscribe(); } catch (e) { }
                                    }, 15000);
                                }, 1500);
                            }
                        }
                    };

                    // Polling bằng setInterval nguyên bản
                    this._pollInterval = setInterval(() => this._checkAndTransition(), 2000);

                    // Khi user quay lại tab bị đóng băng -> lập tức kiểm tra
                    this._visHandler = () => {
                        if (document.visibilityState === 'visible') {
                            this._checkAndTransition();
                        }
                    };
                    document.addEventListener('visibilitychange', this._visHandler);
                }
            });

        // Exit button
        const btnBack = this.add.graphics();
        btnBack.fillStyle(0x555555, 0.9);
        btnBack.fillRoundedRect(20, this.cameras.main.height - 60, 140, 44, 8);
        this.add.text(90, this.cameras.main.height - 38, '⬅ HỦY BỎ', { font: 'bold 16px Inter', fill: '#fff' }).setOrigin(0.5);
        this.add.rectangle(90, this.cameras.main.height - 38, 140, 44, 0x0, 0).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.channel.unsubscribe();
                this.scene.start('MainMenuScene');
            });
    }
}

class EcoTycoon extends Phaser.Scene {
    constructor() {
        super('EcoTycoon');
    }

    init(data) {
        this.gameMode = data.mode || 'single';
        this.mapTheme = MAP_THEMES.find(t => t.id === data.mapTheme) || MAP_THEMES[0];

        if (this.gameMode === 'multi') {
            this.roomId = data.roomId;
            this.myIndex = data.myIndex;
            this.myId = data.myId;
            this.multiPlayers = data.players;
        }
        this.cleanliness = 0; // Starting severely polluted
        this.money = CONFIG.START_MONEY;
        this.ecoPoints = CONFIG.START_ECO_POINTS;
        this.buildings = [];
        this.selectedBuildingType = null;
        this.selectedDecorType = null;
        this.selectedBuilding = null;
        this.grid = [];
        this.lastUpgradeMessage = null;
        this.speechBubble = null;
        this.unlockedTechs = [];
        this.buildMenuBg = null;
        this.buttons = [];
        this.menuMode = 'build'; // 'build' or 'decor'

        // Quest System
        this.quests = [
            { id: 'q1', text: 'Thu gom 5 rác', target: 5, progress: 0, rewardM: 100, rewardE: 20, completed: false, claimed: false },
            { id: 'q2', text: 'Xây 3 Pin Mặt Trời', target: 3, progress: 0, rewardM: 200, rewardE: 50, completed: false, claimed: false },
            { id: 'q3', text: 'Nâng cấp Robot 1 lần', target: 1, progress: 0, rewardM: 0, rewardE: 100, completed: false, claimed: false },
            { id: 'q4', text: 'Đạt 15% Độ Sạch', target: 15, progress: 0, rewardM: 500, rewardE: 150, completed: false, claimed: false },
            { id: 'q5', text: 'Thu gom 50 rác', target: 50, progress: 0, rewardM: 500, rewardE: 100, completed: false, claimed: false },
            { id: 'q6', text: 'Đạt 50% Độ Sạch', target: 50, progress: 0, rewardM: 1000, rewardE: 300, completed: false, claimed: false },
            { id: 'q7', text: 'Đạt 100% Độ Sạch', target: 100, progress: 0, rewardM: 5000, rewardE: 1000, completed: false, claimed: false },
            { id: 'q8', text: 'Sở hữu 1 Skin', target: 1, progress: 0, rewardM: 0, rewardE: 500, completed: false, claimed: false }
        ];
        this.questUnread = 0;

        // Tutorial State
        this.tutorialStep = 0;
        this.tutorialCompleted = false;

        this.landTrash = [];
        this.player = null;
        this.playerStatusText = null;
        this.playerStatusPill = null;

        this.playerSpeedLevel = 1;
        this.playerCapLevel = 1;
        this.playerSpeed = ROBOT_UPGRADES[0].levels[0];
        this.playerCap = ROBOT_UPGRADES[1].levels[0];
        const uid = localStorage.getItem('eco_userid') || 'guest';
        this.playerSkin = localStorage.getItem(`eco_player_skin_${uid}`) || null;
        this.heldTrashArray = [];
        this.heldTrashIcons = [];
        this.placementPreview = null;
        this.placementIndicator = null;
        this.lastGridPos = { x: -1, y: -1 };

        this.incomeMultiplier = 1;
        this.quizBuffTimer = 0;
        this.nextQuizTime = 60000; // First quiz in 60s
        this.minigameActive = false;
        this.minigameScore = 0;
        this.minigameTimer = 0;
        this.minigameSpawnTimer = 0;
        this.minigameItemsArray = [];
        this.seaMinigameActive = false;
        this.seaMinigameTimer = 0;
        this.seaMinigameScore = 0;
        this.statusRefreshTimer = 0;

        this.profEcoTriggered = { '25': false, '50': false, '75': false, '100': false };
        this.prestigePoints = 0;

        this.gameState = 'SETUP'; // 'SETUP', 'PLAYING', 'ENDED'
        this.matchTimer = 0;
        this.matchDuration = 0;
        this.bots = [];
        this.leaderboardTimer = 0;
    }

    create() {
        this.setupAudio();
        this.setupGroups();
        this.setupConstructionVFX();
        this.setupGrid();
        this.setupTrashSpawner();
        this.setupPlayer();
        this.setupMask();
        this.setupUI();
        this.setupInputs();

        // Thay thế createTutorialPopup() tĩnh bằng Guided Tutorial và Quest Menu
        this.createGuidedTutorial();
        this.createQuestMenu();
        this.createProfessorUI();
        this.setupRandomEvents();

        if (this.gameMode === 'multi') {
            this.createLeaderboardUI();
            this.gameState = 'SETUP';
            this.matchDuration = 0;
            this.matchTimer = 0;

            this.bots = [];
            for (let i = 0; i < 3; i++) {
                if (i !== this.myIndex) {
                    this.bots.push({
                        name: this.multiPlayers[i].username,
                        score: 0,
                        isPlayer: false,
                        originalIndex: i
                    });
                }
            }
            this.updateLeaderboard();
        } else {
            this.gameState = 'PLAYING';
            this.matchDuration = Infinity;
            this.matchTimer = Infinity;

            this.loadGame(); // Khôi phục tiến trình (nếu có)

            // Bắt đầu hoặc tiếp tục Tutorial
            this.time.delayedCall(800, () => this.advanceTutorial());

            // Auto-save mỗi 15 giây
            this.time.addEvent({
                delay: 15000,
                loop: true,
                callback: () => this.saveGame()
            });
        }

        window.ProgressLogger.logProgress('game_started');
    }

    setupAudio() {
        this.music = this.sound.add('main_theme', { loop: true, volume: 0.5 });

        // Start music on first interaction
        this.input.once('pointerdown', () => {
            if (this.music && !this.music.isPlaying) this.music.play();
        });
    }

    setupGroups() {
        this.terrainGroup = this.add.group();
        this.cleanTerrainGroup = this.add.group();
        this.buildingGroup = this.add.group();
        this.constructionGroup = this.add.group();
    }

    setupConstructionVFX() {
        if (!this.textures.exists('dust_particle')) {
            const dust = this.make.graphics({ x: 0, y: 0, add: false });
            dust.fillStyle(0xd8b58a, 1);
            dust.fillCircle(12, 12, 10);
            dust.fillStyle(0xf1d4a8, 0.8);
            dust.fillCircle(8, 8, 4);
            dust.generateTexture('dust_particle', 24, 24);
            dust.destroy();
        }

        if (!this.textures.exists('spark_particle')) {
            const spark = this.make.graphics({ x: 0, y: 0, add: false });
            spark.fillStyle(0xffaa00, 1);
            spark.fillCircle(4, 4, 4);
            spark.fillStyle(0xffffff, 0.8);
            spark.fillCircle(4, 4, 2);
            spark.generateTexture('spark_particle', 8, 8);
            spark.destroy();
        }

        if (!this.textures.exists('electronic_particle')) {
            const ep = this.make.graphics({ x: 0, y: 0, add: false });
            ep.fillStyle(0x00ffff, 1);
            ep.fillCircle(4, 4, 4);
            ep.fillStyle(0xffffff, 0.8);
            ep.fillCircle(4, 4, 2);
            ep.generateTexture('electronic_particle', 8, 8);
            ep.destroy();
        }

        if (!this.textures.exists('smoke_particle')) {
            const smoke = this.make.graphics({ x: 0, y: 0, add: false });
            smoke.fillStyle(0x888888, 0.6);
            smoke.fillCircle(12, 12, 10);
            smoke.generateTexture('smoke_particle', 24, 24);
            smoke.destroy();
        }

        if (!this.textures.exists('plastic_particle')) {
            const pp = this.make.graphics({ x: 0, y: 0, add: false });
            pp.fillStyle(0xffffff, 1);
            pp.fillRect(0, 0, 8, 8);
            pp.generateTexture('plastic_particle', 8, 8);
            pp.destroy();
        }

        this.dustEmitter = this.add.particles(0, 0, 'dust_particle', {
            emitting: false,
            lifespan: { min: 450, max: 900 },
            speed: { min: 20, max: 70 },
            angle: { min: 200, max: 340 },
            scale: { start: 0.45, end: 0.05 },
            alpha: { start: 0.8, end: 0 },
            gravityY: -12,
            quantity: 1,
            frequency: -1,
            blendMode: 'NORMAL'
        }).setDepth(850);

        this.sparkEmitter = this.add.particles(0, 0, 'spark_particle', {
            emitting: false,
            lifespan: { min: 200, max: 500 },
            speed: { min: 50, max: 150 },
            angle: { min: 230, max: 310 },
            scale: { start: 0.8, end: 0 },
            alpha: { start: 1, end: 0 },
            gravityY: 300,
            quantity: 1,
            frequency: -1,
            blendMode: 'ADD'
        }).setDepth(850);

        this.electronicEmitter = this.add.particles(0, 0, 'electronic_particle', {
            emitting: false,
            lifespan: { min: 300, max: 700 },
            speed: { min: 40, max: 120 },
            angle: { min: 0, max: 360 },
            scale: { start: 1.2, end: 0 },
            alpha: { start: 1, end: 0 },
            quantity: 1,
            frequency: -1,
            blendMode: 'ADD'
        }).setDepth(850);

        this.smokeEmitter = this.add.particles(0, 0, 'smoke_particle', {
            emitting: false,
            lifespan: { min: 600, max: 1200 },
            speed: { min: 30, max: 60 },
            angle: { min: 250, max: 290 },
            scale: { start: 0.5, end: 1.5 },
            alpha: { start: 0.6, end: 0 },
            gravityY: -20,
            quantity: 1,
            frequency: -1,
            blendMode: 'NORMAL'
        }).setDepth(850);

        this.plasticEmitter = this.add.particles(0, 0, 'plastic_particle', {
            emitting: false,
            lifespan: { min: 400, max: 800 },
            speed: { min: 40, max: 100 },
            angle: { min: 0, max: 360 },
            scale: { start: 1, end: 0 },
            alpha: { start: 1, end: 0 },
            gravityY: 100,
            quantity: 1,
            frequency: -1,
            blendMode: 'NORMAL'
        }).setDepth(850);
    }

    setupGrid() {
        this.zones = [];
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;

        // Luôn sử dụng 1 hòn đảo trung tâm
        this.zones.push({ name: 'ĐẢO SINH THÁI', cx: w / 2, cy: 380, isPlayer: true, scale: 2.2, gridScale: 1.0 });

        const t = this.mapTheme.textures;
        this.zoneVisuals = [];

        this.zones.forEach((zone) => {
            const pollutedIsland = this.add.image(zone.cx, zone.cy, t.polluted).setOrigin(0.5).setDepth(0).setScale(zone.scale);
            const recoveryIsland = this.add.image(zone.cx, zone.cy, t.recovery).setOrigin(0.5).setDepth(1).setScale(zone.scale);
            const thrivingIsland = this.add.image(zone.cx, zone.cy, t.thriving).setOrigin(0.5).setDepth(2).setScale(zone.scale);
            const cleanIsland = this.add.image(zone.cx, zone.cy, t.clean).setOrigin(0.5).setDepth(3).setScale(zone.scale);

            this.zoneVisuals.push({ pollutedIsland, recoveryIsland, thrivingIsland, cleanIsland });

            if (zone.isPlayer) {
                this.islandStartX = zone.cx;
                this.islandStartY = zone.cy - ((CONFIG.GRID_SIZE - 1) * CONFIG.TILE_HEIGHT * zone.gridScale / 2);
                this.islandScale = zone.scale;
                this.islandGridScale = zone.gridScale;
            }
        });

        this.gridGraphics = this.add.graphics().setDepth(4);
        this.gridGraphics.lineStyle(2, 0xffffff, 0.15); // faint grid

        const tw = CONFIG.TILE_WIDTH * this.islandGridScale;
        const th = CONFIG.TILE_HEIGHT * this.islandGridScale;

        // Draw smaller grid lines inside the cells to match 1/3 scale request
        const drawGridCell = (cx, cy, width, height) => {
            this.gridGraphics.beginPath();
            this.gridGraphics.moveTo(cx, cy - height / 2);
            this.gridGraphics.lineTo(cx + width / 2, cy);
            this.gridGraphics.lineTo(cx, cy + height / 2);
            this.gridGraphics.lineTo(cx - width / 2, cy);
            this.gridGraphics.closePath();
            this.gridGraphics.strokePath();
        };

        for (let x = 0; x < CONFIG.GRID_SIZE; x++) {
            this.grid[x] = [];
            for (let y = 0; y < CONFIG.GRID_SIZE; y++) {
                const posX = this.islandStartX + (x - y) * (tw / 2);
                const posY = this.islandStartY + (x + y) * (th / 2);

                drawGridCell(posX, posY, tw / 3, th / 3);

                let buildable = x > 0 && x < CONFIG.GRID_SIZE - 1 && y > 0 && y < CONFIG.GRID_SIZE - 1;
                let ownerIndex = -1; // -1 means no one

                if (this.gameMode === 'multi') {
                    // Boundaries for Y-shape
                    // 1. Diagonal x == y for x < 5
                    // 2. Vertical-ish y == 5 for x >= 5
                    // 3. Horizontal-ish x == 5 for y >= 5
                    if ((x === y && x < 5) || (y === 5 && x >= 5) || (x === 5 && y >= 5)) {
                        buildable = false;
                    } else {
                        if (x < 5 && y > x) ownerIndex = 0; // Left Region
                        else if (y < 5 && x > y) ownerIndex = 1; // Right Region
                        else if (x > 5 && y > 5) ownerIndex = 2; // Bottom Region
                    }
                }

                this.grid[x][y] = {
                    x, y, posX, posY,
                    isWater: false,
                    building: null,
                    pollutedDecor: null,
                    hasTrash: false,
                    isBuildable: buildable,
                    ownerIndex: ownerIndex
                };
            }
        }

        if (this.gameMode === 'multi') {
            const boundaryGraphics = this.add.graphics().setDepth(4);
            boundaryGraphics.lineStyle(6, 0x88ccff, 0.4); // Faint blue thick line

            const getGridPos = (gx, gy) => {
                return {
                    x: this.islandStartX + (gx - gy) * (tw / 2),
                    y: this.islandStartY + (gx + gy) * (th / 2)
                };
            };

            // Boundary 1: Diagonal x=y for x < 5
            const p1 = getGridPos(0, 0);
            const p2 = getGridPos(5, 5);
            boundaryGraphics.lineBetween(p1.x, p1.y, p2.x, p2.y);

            // Boundary 2: x=5 for y >= 5
            const p3 = getGridPos(5, 5);
            const p4 = getGridPos(5, 10);
            boundaryGraphics.lineBetween(p3.x, p3.y, p4.x, p4.y);

            // Boundary 3: y=5 for x >= 5
            const p5 = getGridPos(5, 5);
            const p6 = getGridPos(10, 5);
            boundaryGraphics.lineBetween(p5.x, p5.y, p6.x, p6.y);

            // Add Nametags in the middle of each region
            if (this.multiPlayers && this.multiPlayers.length >= 3) {
                const colors = ['#ff4444', '#44ff44', '#4444ff'];
                const positions = [{ x: 2, y: 8 }, { x: 8, y: 2 }, { x: 8, y: 8 }];
                for (let i = 0; i < 3; i++) {
                    this.add.text(getGridPos(positions[i].x, positions[i].y).x, getGridPos(positions[i].x, positions[i].y).y - 20, this.multiPlayers[i].username, { font: 'bold 24px Inter', fill: colors[i] }).setOrigin(0.5).setDepth(5).setAlpha(0.7);
                }
            }
        }
    }

    setupTrashSpawner() {
        this.time.addEvent({
            delay: 3000,
            loop: true,
            callback: () => {
                // Only Host spawns trash in multi mode
                if (this.gameMode === 'multi' && this.myIndex !== 0) return;
                this.spawnTrashOnLand();
                if (this.currentEvent && this.currentEvent.id === 'acid_rain') {
                    this.time.delayedCall(500, () => this.spawnTrashOnLand());
                }
            }
        });
    }

    spawnTrashOnLand() {
        if (this.gameState !== 'PLAYING') return;

        const validCells = [];
        for (let x = 1; x < CONFIG.GRID_SIZE - 1; x++) {
            for (let y = 1; y < CONFIG.GRID_SIZE - 1; y++) {
                const cell = this.grid[x][y];
                if (cell.isBuildable && !cell.building && !cell.hasTrash) {
                    validCells.push(cell);
                }
            }
        }

        if (validCells.length > 0) {
            const cell = validCells[Math.floor(Math.random() * validCells.length)];
            const trashType = TRASH_TYPES[Math.floor(Math.random() * TRASH_TYPES.length)];
            const variantKey = trashType.variants[Math.floor(Math.random() * trashType.variants.length)];

            let sc = 0.06 * this.islandGridScale;
            if (trashType.type === 'electronic') sc = 0.04 * this.islandGridScale;

            const trash = this.add.image(cell.posX, cell.posY - 10, variantKey).setScale(sc).setDepth((cell.x + cell.y) * 10 + 2);
            trash.setData('type', trashType.type);
            trash.setData('variantKey', variantKey);
            trash.setData('cell', cell);
            trash.setData('targeted', false);
            trash.setData('id', Math.random().toString(36).substr(2, 9)); // Unique ID for sync

            cell.hasTrash = true;
            this.landTrash.push(trash);

            this.updateHUD();

            if (this.gameMode === 'multi') {
                this.roomChannel.send({
                    type: 'broadcast',
                    event: 'trash_spawned',
                    payload: {
                        id: trash.getData('id'),
                        typeIndex: TRASH_TYPES.indexOf(trashType),
                        variantKey: variantKey,
                        gx: cell.x,
                        gy: cell.y
                    }
                });
            }

            if (this.gameMode === 'multi') {
                if (this.landTrash.length === Math.floor(CONFIG.MAX_TRASH_ALLOWED * 0.8)) {
                    this.showToast('CẢNH BÁO: Rác đã gần đầy, hãy nhanh chóng dọn dẹp!');
                }
                // Trong Multiplayer, không Game Over khi rác đầy. Chỉ ngừng sinh ra (bằng cách giới hạn max trash).
            } else {
                if (this.landTrash.length >= CONFIG.MAX_TRASH_ALLOWED) {
                    this.triggerGameOver('RÁC ĐÃ NGẬP KÍN ĐẢO!');
                } else if (this.landTrash.length === Math.floor(CONFIG.MAX_TRASH_ALLOWED * 0.8)) {
                    this.showToast('CẢNH BÁO: Rác sắp ngập đảo!');
                }
            }
        } else {
            if (this.gameMode !== 'multi' && this.landTrash.length >= 10) {
                this.triggerGameOver('RÁC ĐÃ NGẬP KÍN ĐẢO!');
            }
        }
    }

    setupPlayer() {
        const tw = CONFIG.TILE_WIDTH * this.islandGridScale;
        const th = CONFIG.TILE_HEIGHT * this.islandGridScale;
        const getGridPos = (gx, gy) => {
            return {
                x: this.islandStartX + (gx - gy) * (tw / 2),
                y: this.islandStartY + (gx + gy) * (th / 2)
            };
        };

        let myStartGrid = { x: 5, y: 5 }; // default center

        if (this.gameMode === 'multi') {
            const startPositions = [
                { x: 2, y: 8 }, // Left
                { x: 8, y: 2 }, // Right
                { x: 8, y: 8 }  // Bottom
            ];
            myStartGrid = startPositions[this.myIndex];

            // Setup Network Avatars for other players
            this.networkPlayers = [];
            for (let i = 0; i < 3; i++) {
                if (i !== this.myIndex) {
                    const pos = getGridPos(startPositions[i].x, startPositions[i].y);
                    const netSprite = this.add.image(pos.x, pos.y, 'worker_robot').setScale(0.07 * this.islandGridScale).setDepth(1000).setTint(0x8888ff);

                    // Add safety check in case this.multiPlayers[i] is undefined for some reason
                    const pName = this.multiPlayers[i] ? this.multiPlayers[i].username : `Guest_${i}`;
                    const netName = this.add.text(pos.x, pos.y - 40, pName, { font: 'bold 14px Inter', fill: '#8888ff' }).setOrigin(0.5).setDepth(1001);
                    this.networkPlayers[i] = { sprite: netSprite, text: netName, heldTrashIcons: [], targetX: pos.x, targetY: pos.y, targetFlipX: false, targetDepth: 1000 };
                }
            }

            this.setupNetwork();
        } else {
            // single player starts near bottom
            myStartGrid = { x: 5, y: 8 };
        }

        const startPos = getGridPos(myStartGrid.x, myStartGrid.y);

        this.playerInteractionRing = this.add.ellipse(startPos.x, startPos.y + 30 * this.islandGridScale, 104 * this.islandGridScale, 28 * this.islandGridScale, 0x32cd32, 0.22)
            .setStrokeStyle(3, 0x9cff75, 0.75)
            .setDepth(995);

        const initTex = this.playerSkin ? this.playerSkin : 'worker_robot';
        const initScale = this.playerSkin ? 0.12 : (0.07 * this.islandGridScale);
        this.player = this.add.image(startPos.x, startPos.y, initTex).setScale(initScale).setDepth(1000);
        this.player.gridX = myStartGrid.x;
        this.player.gridY = myStartGrid.y;
        
        if (this.playerSkin === 'robot_skin_panda') this.playerSpeed *= 1.1;
        if (this.playerSkin === 'robot_skin_mecha') this.playerCap += 2;
    }

    setupNetwork() {
        this.roomChannel = supabase.channel(this.roomId);

        this.roomChannel
            .on('broadcast', { event: 'player_moved' }, (payload) => {
                const data = payload.payload;
                if (data.id !== this.myId) {
                    const netIndex = this.multiPlayers.findIndex(p => p.id === data.id);
                    if (netIndex !== -1 && this.networkPlayers[netIndex]) {
                        const netPlayer = this.networkPlayers[netIndex];

                        // Store target for lerp interpolation (NO tweens — prevents memory leak on mobile)
                        netPlayer.targetX = data.x;
                        netPlayer.targetY = data.y;
                        netPlayer.targetFlipX = data.flipX;
                        netPlayer.targetDepth = data.depth;

                        // Update held trash (exact variant sync)
                        const remoteVariants = data.heldTrashVariants || [];
                        const needsUpdate = !netPlayer.heldTrashVariants ||
                            netPlayer.heldTrashVariants.length !== remoteVariants.length ||
                            netPlayer.heldTrashVariants.some((v, idx) => v !== remoteVariants[idx]);

                        if (needsUpdate) {
                            netPlayer.heldTrashIcons.forEach(i => i.destroy());
                            netPlayer.heldTrashIcons = [];
                            netPlayer.heldTrashVariants = [...remoteVariants];
                            remoteVariants.forEach((vKey, j) => {
                                const textureKey = this.textures.exists(vKey) ? vKey : 'trash_organic';
                                let sc = 0.08;
                                if (textureKey.includes('circuit')) sc = 0.05;
                                const icon = this.add.image(data.x, data.y - 50 - j * 20, textureKey).setScale(sc).setDepth(data.depth + 1);
                                netPlayer.heldTrashIcons.push(icon);
                            });
                        }
                    }
                }
            })
            .on('broadcast', { event: 'start_match' }, (payload) => {
                if (this.gameState !== 'PLAYING' && payload.payload && payload.payload.duration) {
                    this.startMatch(payload.payload.duration);
                }
            })
            .on('broadcast', { event: 'chat_msg' }, (payload) => {
                const data = payload.payload;
                if (data && data.username && data.message) {
                    this.appendChatMessage(data.username, data.message);
                }
            })
            .on('broadcast', { event: 'sync_stats' }, (payload) => {
                const data = payload.payload;
                if (data && data.id !== this.myId) {
                    const netIndex = this.multiPlayers ? this.multiPlayers.findIndex(p => p.id === data.id) : -1;
                    if (netIndex !== -1) {
                        const clean = isNaN(data.cleanliness) ? 0 : (Number(data.cleanliness) || 0);
                        const mon = isNaN(data.money) ? 0 : (Number(data.money) || 0);
                        const eco = isNaN(data.ecoPoints) ? 0 : (Number(data.ecoPoints) || 0);

                        this.playerCleanliness[netIndex] = clean;
                        this.updateMask();

                        if (this.bots) {
                            const botObj = this.bots.find(b => b.originalIndex === netIndex);
                            if (botObj) {
                                botObj.score = clean * 10 + mon * 0.1 + eco * 0.5;
                                this.updateLeaderboard();
                            }
                        }
                    }
                }
            })
            .on('broadcast', { event: 'building_placed' }, (payload) => {
                const data = payload.payload;
                if (data.id !== this.myId) {
                    const cell = this.grid[data.gx][data.gy];
                    if (cell && !cell.building) {
                        const bType = BUILDING_TYPES.find(b => b.key === data.key);
                        if (bType) {
                            const netIndex = this.multiPlayers ? this.multiPlayers.findIndex(p => p.id === data.id) : -1;
                            const b = this.add.image(cell.posX, cell.posY + 18, bType.key).setScale(0.1).setDepth(this.getDepthForCell(cell, 5));
                            b.setData({
                                ownerIndex: netIndex,
                                cleanRate: bType.cleanRate,
                                incomeRate: bType.incomeRate,
                                ecoRate: bType.ecoRate,
                                isProcessor: bType.isProcessor,
                                processType: bType.processType
                            });
                            this.buildingGroup.add(b);
                            cell.building = b;
                            this.buildings.push(b);
                            this.dustEmitter.explode(10, cell.posX, cell.posY);
                        }
                    }
                }
            })
            .on('broadcast', { event: 'decor_placed' }, (payload) => {
                const data = payload.payload;
                if (data.id !== this.myId) {
                    const cell = this.grid[data.gx][data.gy];
                    if (cell && !cell.building) {
                        if (cell.pollutedDecor) {
                            cell.pollutedDecor.destroy();
                            cell.pollutedDecor = null;
                        }
                        const d = this.add.image(cell.posX, cell.posY - 10, data.key).setScale(0.12).setDepth(this.getDepthForCell(cell, 4));
                        d.setMask(this.geometryMask);
                        this.buildingGroup.add(d);
                        cell.building = d;
                        d.setData('isDecor', true);
                        this.dustEmitter.explode(10, cell.posX, cell.posY);
                    }
                }
            })
            .on('broadcast', { event: 'trash_spawned' }, (payload) => {
                const data = payload.payload;
                const cell = this.grid[data.gx][data.gy];
                if (cell && !cell.hasTrash) {
                    const trashType = TRASH_TYPES[data.typeIndex];
                    let sc = 0.06 * this.islandGridScale;
                    if (trashType.type === 'electronic') sc = 0.04 * this.islandGridScale;

                    const trash = this.add.image(cell.posX, cell.posY - 10, data.variantKey).setScale(sc).setDepth((cell.x + cell.y) * 10 + 2);
                    trash.setData('type', trashType.type);
                    trash.setData('variantKey', data.variantKey);
                    trash.setData('cell', cell);
                    trash.setData('targeted', false);
                    trash.setData('id', data.id);

                    cell.hasTrash = true;
                    this.landTrash.push(trash);
                    this.updateHUD();
                }
            })
            .on('broadcast', { event: 'trash_picked' }, (payload) => {
                const data = payload.payload;
                const trashIdx = this.landTrash.findIndex(t => t.getData('id') === data.id);
                if (trashIdx !== -1) {
                    const t = this.landTrash[trashIdx];
                    t.getData('cell').hasTrash = false;
                    t.destroy();
                    this.landTrash.splice(trashIdx, 1);
                    this.updateHUD();
                }
            })
            .subscribe((status) => {
                if (status === 'SUBSCRIBED') {
                    // Send out movement periodically
                    this.time.addEvent({
                        delay: 200, // 5hz — giảm tải cho mobile
                        loop: true,
                        callback: () => {
                            if (this.player && this.gameState === 'PLAYING') {
                                this.roomChannel.send({
                                    type: 'broadcast',
                                    event: 'player_moved',
                                    payload: {
                                        id: this.myId,
                                        x: this.player.x,
                                        y: this.player.y,
                                        flipX: this.player.flipX,
                                        depth: this.player.depth,
                                        heldTrashCount: this.heldTrashArray.length,
                                        heldTrashVariants: this.heldTrashIcons.map(icon => icon.texture.key)
                                    }
                                });
                            }
                        }
                    });

                    // Send stats periodically
                    this.time.addEvent({
                        delay: 1000, // 1hz
                        loop: true,
                        callback: () => {
                            if (this.gameState === 'PLAYING') {
                                this.roomChannel.send({
                                    type: 'broadcast',
                                    event: 'sync_stats',
                                    payload: {
                                        id: this.myId,
                                        cleanliness: this.cleanliness,
                                        money: this.money,
                                        ecoPoints: this.ecoPoints
                                    }
                                });
                            }
                        }
                    });
                }
            });
    }

    setupMask() {
        this.zoneVisuals.forEach((zv, idx) => {
            const recoveryGraphics = this.make.graphics();
            zv.recoveryIsland.setMask(recoveryGraphics.createGeometryMask());

            const thrivingGraphics = this.make.graphics();
            zv.thrivingIsland.setMask(thrivingGraphics.createGeometryMask());

            const cleanGraphics = this.make.graphics();
            const cleanMask = cleanGraphics.createGeometryMask();
            zv.cleanIsland.setMask(cleanMask);

            zv.recoveryMaskGraphics = recoveryGraphics;
            zv.thrivingMaskGraphics = thrivingGraphics;
            zv.cleanMaskGraphics = cleanGraphics;

            // Reference them directly for easier access
            this.recoveryMaskGraphics = recoveryGraphics;
            this.thrivingMaskGraphics = thrivingGraphics;
            this.cleanMaskGraphics = cleanGraphics;
        });

        if (this.gameMode === 'multi') {
            this.playerCleanliness = [0, 0, 0, 0];
        }
        this.geometryMask = this.cleanMaskGraphics.createGeometryMask();
    }

    setupUI() {
        // --- Top Left HUD ---
        const hudBg = this.add.graphics();
        hudBg.fillStyle(0x000000, 0.4);
        hudBg.fillRoundedRect(10, 10, 200, 100, 15);
        hudBg.setScrollFactor(0).setDepth(1000);

        // Money
        this.add.circle(30, 30, 15, 0xffcc00).setScrollFactor(0).setDepth(1001);
        this.add.text(30, 30, '$', { font: 'bold 18px Inter', fill: '#000' }).setOrigin(0.5).setScrollFactor(0).setDepth(1002);
        this.moneyText = this.add.text(55, 18, `$${Math.floor(this.money)}`, { font: 'bold 22px Inter', fill: '#ffcc00', stroke: '#000000', strokeThickness: 4 }).setScrollFactor(0).setDepth(1001);

        // Eco Points
        this.add.text(30, 65, '🌱', { font: '20px Inter' }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);
        this.ecoPointsText = this.add.text(55, 53, `${Math.floor(this.ecoPoints)}`, { font: 'bold 22px Inter', fill: '#a2ff66', stroke: '#000000', strokeThickness: 4 }).setScrollFactor(0).setDepth(1001);

        // --- Buff Indicator ---
        this.buffText = this.add.text(120, 30, 'x2 THU NHẬP!', { font: 'bold 16px Inter', fill: '#00ff00', stroke: '#000000', strokeThickness: 4 }).setScrollFactor(0).setDepth(1002).setVisible(false);
        // --- Cleanliness ---
        this.add.text(20, 120, 'ĐỘ SẠCH:', { font: 'bold 16px Inter', fill: '#ffffff', stroke: '#000000', strokeThickness: 4 }).setScrollFactor(0).setDepth(1001);
        this.cleanlinessValueText = this.add.text(105, 120, `${Math.floor(this.cleanliness)}%`, { font: 'bold 16px Inter', fill: '#ffcc00', stroke: '#000000', strokeThickness: 4 }).setScrollFactor(0).setDepth(1001);

        // Cleanliness Progress Bar
        const barBg = this.add.graphics().setScrollFactor(0).setDepth(1000);
        barBg.fillStyle(0x000000, 0.6);
        barBg.fillRoundedRect(20, 145, 180, 15, 8);
        barBg.lineStyle(2, 0xffcc00);
        barBg.strokeRoundedRect(19, 144, 182, 17, 8);

        this.cleanProgressBar = this.add.graphics().setScrollFactor(0).setDepth(1001);

        // --- Trash Limit Indicator ---
        this.add.text(20, 175, 'RÁC TỒN ĐỌNG:', { font: 'bold 14px Inter', fill: '#ffffff', stroke: '#000000', strokeThickness: 4 }).setScrollFactor(0).setDepth(1001);
        this.trashCountText = this.add.text(140, 175, `0/${CONFIG.MAX_TRASH_ALLOWED}`, { font: 'bold 14px Inter', fill: '#ff4444', stroke: '#000000', strokeThickness: 4 }).setScrollFactor(0).setDepth(1001);

        // --- Top Center Banner ---
        const bannerBg = this.add.graphics().setScrollFactor(0).setDepth(1000);
        bannerBg.fillStyle(0xcd853f, 1);
        bannerBg.fillRoundedRect(this.cameras.main.width / 2 - 100, 15, 200, 60, 10);
        bannerBg.lineStyle(4, 0x8b4513);
        bannerBg.strokeRoundedRect(this.cameras.main.width / 2 - 100, 15, 200, 60, 10);

        const bannerTitle = this.gameMode === 'multi' ? 'KHU 1 (BẠN)' : 'ĐẢO SINH THÁI';

        this.add.text(this.cameras.main.width / 2, 30, bannerTitle, {
            font: 'bold 16px Inter',
            fill: '#000000',
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);

        this.matchTimerText = this.add.text(this.cameras.main.width / 2, 55, this.gameMode === 'multi' ? '00:00' : 'CHƠI ĐƠN', {
            font: 'bold 22px Inter',
            fill: '#8b0000',
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);

        // --- Research Button (Top Right) ---
        const btnResearchBg = this.add.graphics().setScrollFactor(0).setDepth(1000);
        btnResearchBg.fillStyle(0x4682b4, 1);
        btnResearchBg.fillRoundedRect(this.cameras.main.width - 160, 20, 140, 45, 10);
        btnResearchBg.lineStyle(3, 0x104e8b);
        btnResearchBg.strokeRoundedRect(this.cameras.main.width - 160, 20, 140, 45, 10);

        const btnResearchHitArea = this.add.rectangle(this.cameras.main.width - 90, 42, 140, 45, 0x000, 0)
            .setInteractive({ useHandCursor: true })
            .setScrollFactor(0)
            .setDepth(1001);

        this.add.text(this.cameras.main.width - 90, 42, '🔬 NGHIÊN CỨU', {
            font: 'bold 14px Inter',
            fill: '#ffffff'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);

        btnResearchHitArea.on('pointerdown', (pointer) => {
            pointer.event.stopPropagation();
            this.openResearchMenu();
        });

        // --- Library Button (Top Right, beside Research) ---
        const btnLibraryBg = this.add.graphics().setScrollFactor(0).setDepth(1000);
        btnLibraryBg.fillStyle(0x32cd32, 1);
        btnLibraryBg.fillRoundedRect(this.cameras.main.width - 320, 20, 140, 45, 10);
        btnLibraryBg.lineStyle(3, 0x006400);
        btnLibraryBg.strokeRoundedRect(this.cameras.main.width - 320, 20, 140, 45, 10);

        const btnLibraryHitArea = this.add.rectangle(this.cameras.main.width - 250, 42, 140, 45, 0x000, 0)
            .setInteractive({ useHandCursor: true })
            .setScrollFactor(0)
            .setDepth(1001);

        this.add.text(this.cameras.main.width - 250, 42, '📚 THƯ VIỆN', {
            font: 'bold 14px Inter',
            fill: '#ffffff'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);

        btnLibraryHitArea.on('pointerdown', (pointer) => {
            pointer.event.stopPropagation();
            this.openLibraryMenu();
        });

        // --- Minigame Button (Top Right, beside Library) ---
        const btnMinigameBg = this.add.graphics().setScrollFactor(0).setDepth(1000);
        btnMinigameBg.fillStyle(0xff8c00, 1);
        btnMinigameBg.fillRoundedRect(this.cameras.main.width - 480, 20, 140, 45, 10);
        btnMinigameBg.lineStyle(3, 0x8b4500);
        btnMinigameBg.strokeRoundedRect(this.cameras.main.width - 480, 20, 140, 45, 10);

        const btnMinigameHitArea = this.add.rectangle(this.cameras.main.width - 410, 42, 140, 45, 0x000, 0)
            .setInteractive({ useHandCursor: true })
            .setScrollFactor(0)
            .setDepth(1001);

        this.add.text(this.cameras.main.width - 410, 42, '🎮 MINI GAME', {
            font: 'bold 14px Inter',
            fill: '#ffffff'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);

        btnMinigameHitArea.on('pointerdown', (pointer) => {
            pointer.event.stopPropagation();
            this.openMinigame();
        });

        // --- Quiz Button (Top Right Row 2) ---
        const btnQuizBg = this.add.graphics().setScrollFactor(0).setDepth(1000);
        btnQuizBg.fillStyle(0xff00ff, 1);
        btnQuizBg.fillRoundedRect(this.cameras.main.width - 160, 75, 140, 45, 10);
        btnQuizBg.lineStyle(3, 0x8b008b);
        btnQuizBg.strokeRoundedRect(this.cameras.main.width - 160, 75, 140, 45, 10);

        const btnQuizHitArea = this.add.rectangle(this.cameras.main.width - 90, 97, 140, 45, 0x000, 0)
            .setInteractive({ useHandCursor: true })
            .setScrollFactor(0)
            .setDepth(1001);

        this.add.text(this.cameras.main.width - 90, 97, '📝 CÂU HỎI', {
            font: 'bold 14px Inter',
            fill: '#ffffff'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);

        btnQuizHitArea.on('pointerdown', (pointer) => {
            pointer.event.stopPropagation();
            this.showQuiz();
        });

        // --- Quest Button (Top Right Row 2) ---
        const btnQuestBg = this.add.graphics().setScrollFactor(0).setDepth(1000);
        btnQuestBg.fillStyle(0x00ccff, 1);
        btnQuestBg.fillRoundedRect(this.cameras.main.width - 320, 75, 140, 45, 10);
        btnQuestBg.lineStyle(3, 0x0088cc);
        btnQuestBg.strokeRoundedRect(this.cameras.main.width - 320, 75, 140, 45, 10);

        const btnQuestHitArea = this.add.rectangle(this.cameras.main.width - 250, 97, 140, 45, 0x000, 0)
            .setInteractive({ useHandCursor: true })
            .setScrollFactor(0)
            .setDepth(1001);

        this.add.text(this.cameras.main.width - 250, 97, '🎯 NHIỆM VỤ', {
            font: 'bold 14px Inter',
            fill: '#000000'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);

        this.questBadgeBg = this.add.circle(this.cameras.main.width - 190, 80, 10, 0xff0000).setScrollFactor(0).setDepth(1002).setVisible(false);
        this.questBadgeText = this.add.text(this.cameras.main.width - 190, 80, '!', { font: 'bold 12px Inter', fill: '#ffffff' }).setOrigin(0.5).setScrollFactor(0).setDepth(1003).setVisible(false);

        btnQuestHitArea.on('pointerdown', (pointer) => {
            pointer.event.stopPropagation();
            this.openQuestMenu();
        });

        // --- Shop Button (Top Right Row 2) ---
        const btnShopBg = this.add.graphics().setScrollFactor(0).setDepth(1000);
        btnShopBg.fillStyle(0x9400d3, 1);
        btnShopBg.fillRoundedRect(this.cameras.main.width - 480, 75, 140, 45, 10);
        btnShopBg.lineStyle(3, 0x4b0082);
        btnShopBg.strokeRoundedRect(this.cameras.main.width - 480, 75, 140, 45, 10);

        const btnShopHitArea = this.add.rectangle(this.cameras.main.width - 410, 97, 140, 45, 0x000, 0)
            .setInteractive({ useHandCursor: true })
            .setScrollFactor(0)
            .setDepth(1001);

        this.add.text(this.cameras.main.width - 410, 97, '🛒 CỬA HÀNG', {
            font: 'bold 14px Inter',
            fill: '#ffffff'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);

        btnShopHitArea.on('pointerdown', (pointer) => {
            pointer.event.stopPropagation();
            this.openShopMenu();
        });

        // --- Pause / Exit Button (Top Left, below Banner) ---
        const btnExitBg = this.add.graphics().setScrollFactor(0).setDepth(1000);
        btnExitBg.fillStyle(0xdc143c, 1);
        btnExitBg.fillRoundedRect(this.cameras.main.width / 2 - 70, 85, 140, 36, 10);
        btnExitBg.lineStyle(3, 0x8b0000);
        btnExitBg.strokeRoundedRect(this.cameras.main.width / 2 - 70, 85, 140, 36, 10);

        const btnExitHitArea = this.add.rectangle(this.cameras.main.width / 2 - 70, 103, 130, 36, 0x000, 0)
            .setInteractive({ useHandCursor: true })
            .setScrollFactor(0)
            .setDepth(1001);

        this.add.text(this.cameras.main.width / 2 - 70, 103, '⏸ TẠM DỪNG', {
            font: 'bold 14px Inter',
            fill: '#ffffff'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);

        btnExitHitArea.on('pointerdown', (pointer) => {
            pointer.event.stopPropagation();
            this.openExitMenu();
        });

        // Lab minigame button is now moved into the MINIGAME menu

        // --- Virtual Joystick for Mobile Movement ---
        this.joystickBase = this.add.circle(150, this.cameras.main.height - 250, 80, 0x000000, 0.4).setScrollFactor(0).setDepth(2000);
        this.joystickBase.setStrokeStyle(3, 0xffffff, 0.5);
        this.joystickThumb = this.add.circle(150, this.cameras.main.height - 250, 40, 0xffffff, 0.8).setScrollFactor(0).setDepth(2001);
        this.joystickVector = { x: 0, y: 0 };
        this.joystickPointer = null;
        this.isDraggingMap = false;

        // --- Build Menu Background ---
        this.buildMenuBg = this.add.graphics().setScrollFactor(0).setDepth(900);

        // Mode Tabs
        this.btnTabBuild = this.createTabButton(this.cameras.main.width / 2 - 150, this.cameras.main.height - 145, 'MÁY MÓC', true, () => this.switchMenuMode('build'));
        this.btnTabDecor = this.createTabButton(this.cameras.main.width / 2, this.cameras.main.height - 145, 'TRANG TRÍ', false, () => this.switchMenuMode('decor'));
        this.btnTabRobot = this.createTabButton(this.cameras.main.width / 2 + 150, this.cameras.main.height - 145, 'ROBOT', false, () => this.switchMenuMode('robot'));

        this.refreshMenu();
        this.createPlayerStatusUI();
        this.createSpeechBubble();
        this.createResearchMenu();
        this.createLibraryMenu();
        this.createQuizMenu();
        this.createMinigame();
        this.createSeaMinigame();
        this.createExitMenu();
        this.createTrashInfoMenu();
        this.createShopMenu();
        this.createLabMenu();
        if (this.gameMode === 'multi') {
            this.createMatchSetupMenu();
            this.createChatUI();
        }

        this.updateHUD();
    }

    createTabButton(x, y, text, isActive, callback) {
        const bg = this.add.graphics().setScrollFactor(0).setDepth(901);
        const drawBg = (active) => {
            bg.clear();
            bg.fillStyle(active ? 0x000000 : 0x555555, 0.7);
            bg.fillRoundedRect(x - 70, y - 15, 140, 30, 8);
        };
        drawBg(isActive);

        const txt = this.add.text(x, y, text, { font: 'bold 14px Inter', fill: isActive ? '#ffffff' : '#aaaaaa' }).setOrigin(0.5).setScrollFactor(0).setDepth(902);
        const hitArea = this.add.rectangle(x, y, 140, 30, 0x000, 0).setInteractive({ useHandCursor: true }).setScrollFactor(0).setDepth(903);

        hitArea.on('pointerdown', (p) => {
            p.event.stopPropagation();
            callback();
        });

        return { bg, txt, drawBg };
    }

    switchMenuMode(mode) {
        this.menuMode = mode;
        this.btnTabBuild.drawBg(mode === 'build');
        this.btnTabBuild.txt.setFill(mode === 'build' ? '#ffffff' : '#aaaaaa');
        this.btnTabDecor.drawBg(mode === 'decor');
        this.btnTabDecor.txt.setFill(mode === 'decor' ? '#ffffff' : '#aaaaaa');
        this.btnTabRobot.drawBg(mode === 'robot');
        this.btnTabRobot.txt.setFill(mode === 'robot' ? '#ffffff' : '#aaaaaa');
        this.selectedBuildingType = null;
        this.selectedDecorType = null;
        this.refreshMenu();
    }

    refreshMenu() {
        this.buttons.forEach(b => b.destroy());
        this.buttons = [];
        this.buildMenuBg.clear();

        if (this.menuMode === 'robot') {
            const bgX = (this.cameras.main.width - 400) / 2;
            const bgY = this.cameras.main.height - 120;
            this.buildMenuBg.fillStyle(0x000000, 0.7);
            this.buildMenuBg.fillRoundedRect(bgX, bgY, 400, 100, 16);

            [
                { id: 'speed', name: 'Động Cơ', icon: 'wind_turbine', currentLv: this.playerSpeedLevel, maxLv: 4, upgradeData: ROBOT_UPGRADES[0] },
                { id: 'capacity', name: 'Thùng Chứa', icon: 'organic_composter_l1', currentLv: this.playerCapLevel, maxLv: 4, upgradeData: ROBOT_UPGRADES[1] }
            ].forEach((upg, i) => {
                const x = bgX + 100 + i * 200;
                const y = bgY + 50;
                const container = this.add.container(x, y).setDepth(1000).setScrollFactor(0);

                const isMax = upg.currentLv >= upg.maxLv;
                const cost = isMax ? 0 : upg.upgradeData.costs[upg.currentLv - 1];
                const costStr = isMax ? 'MAX' : `$${cost}`;

                const icon = this.add.image(0, -10, upg.icon).setScale(0.06).setInteractive();
                const label = this.add.text(0, 25, `${upg.name} Lv.${upg.currentLv}\n${costStr}`, { font: 'bold 14px Inter', fill: '#ffffff', align: 'center', stroke: '#000000', strokeThickness: 2 }).setOrigin(0.5);

                icon.on('pointerdown', (pointer) => {
                    pointer.event.stopPropagation();
                    if (!isMax && this.money >= cost) {
                        this.money -= cost;
                        if (upg.id === 'speed') {
                            this.playerSpeedLevel++;
                            this.playerSpeed = upg.upgradeData.levels[this.playerSpeedLevel - 1];
                        } else {
                            this.playerCapLevel++;
                            this.playerCap = upg.upgradeData.levels[this.playerCapLevel - 1];
                        }
                        this.sound.play('build_sfx');
                        this.showFloatingText(this.cameras.main.width / 2, this.cameras.main.height / 2, 'NÂNG CẤP THÀNH CÔNG!', '#00ff00');
                        this.updateQuestProgress('q3', 1);
                        this.checkRobotEvolution();
                        this.refreshMenu();
                        this.updateHUD();
                    } else if (!isMax) {
                        this.showToast('Không đủ tiền!');
                    }
                });

                container.add([icon, label]);
                this.buttons.push(container);
            });
            return;
        }

        const items = this.menuMode === 'build' ? BUILDING_TYPES : DECOR_TYPES;

        // Dynamically size background based on button count
        const btnWidth = 100;
        const padding = 15;
        const totalWidth = items.length * btnWidth + (items.length - 1) * padding + 40;

        const bgX = (this.cameras.main.width - totalWidth) / 2;
        const bgY = this.cameras.main.height - 120;

        this.buildMenuBg.fillStyle(0x000000, 0.7);
        this.buildMenuBg.fillRoundedRect(bgX, bgY, totalWidth, 100, 16);

        items.forEach((btn, i) => {
            const x = bgX + 20 + (btnWidth / 2) + i * (btnWidth + padding);
            const y = bgY + 50;
            const container = this.add.container(x, y).setDepth(1000).setScrollFactor(0);

            const isUnlocked = !btn.unlockReq || this.unlockedTechs.includes(btn.unlockReq);

            const icon = this.add.image(0, -10, btn.key).setScale(0.08).setInteractive();
            if (!isUnlocked) {
                icon.setTint(0x555555);
            }

            const costStr = this.menuMode === 'build' ? `$${btn.cost}` : `${btn.costEco} 🌱`;
            const labelText = isUnlocked ? `${btn.name}\n${costStr}` : `[KHÓA]\n${btn.name}`;
            const labelColor = isUnlocked ? (this.menuMode === 'build' ? '#ffffff' : '#32cd32') : '#aaaaaa';

            const label = this.add.text(0, 30, labelText, { font: 'bold 12px Inter', fill: labelColor, align: 'center', stroke: '#000000', strokeThickness: 2 }).setOrigin(0.5);

            icon.on('pointerdown', (pointer) => {
                pointer.event.stopPropagation();
                if (!isUnlocked) {
                    this.showToast('Vào "Nghiên Cứu" để mở khóa!');
                    return;
                }
                if (this.menuMode === 'build') {
                    if (this.money < btn.cost) {
                        this.showToast('Không đủ tiền!');
                        return;
                    }
                    this.selectedBuildingType = btn;
                    this.selectedDecorType = null;
                } else {
                    if (this.ecoPoints < btn.costEco) {
                        this.showToast('Không đủ Eco Points!');
                        return;
                    }
                    this.selectedDecorType = btn;
                    this.selectedBuildingType = null;
                }
                this.selectedBuilding = null;
                this.hideSpeechBubble();
                this.highlightSelected(container);
                this.updatePlacementPreview();
            });

            container.add([icon, label]);
            this.buttons.push(container);
        });
    }

    showFloatingText(x, y, msg, color) {
        const floatText = this.add.text(x, y, msg, { font: 'bold 20px Inter', fill: color, stroke: '#000000', strokeThickness: 3 }).setOrigin(0.5).setDepth(6000);
        this.tweens.add({ targets: floatText, y: y - 30, alpha: 0, duration: 800, onComplete: () => floatText.destroy() });
    }

    createPlayerStatusUI() {
        const x = this.cameras.main.width / 2;
        const y = this.cameras.main.height - 190;
        this.playerStatusPill = this.add.graphics().setScrollFactor(0).setDepth(2500);
        this.playerStatusText = this.add.text(x, y, '', {
            font: 'bold 16px Inter',
            fill: '#ffffff',
            stroke: '#13231b',
            strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(2501);
        this.updatePlayerStatus();
    }

    updatePlayerStatus() {
        if (!this.playerStatusText || !this.player) return;

        let message = `⬢ LÁI ROBOT ĐẾN RÁC ĐỂ NHẶT (${this.heldTrashArray.length}/${this.playerCap})`;
        let color = 0x176b3a;
        let accent = 0x8effa8;

        if (this.heldTrashArray.length > 0) {
            const counts = {};
            this.heldTrashArray.forEach(t => counts[t] = (counts[t] || 0) + 1);
            const holdingDesc = Object.entries(counts).map(([type, qty]) => {
                const tr = TRASH_TYPES.find(tt => tt.type === type);
                return `${qty} ${tr.name.toUpperCase()}`;
            }).join(', ');

            message = `ĐANG MANG: ${holdingDesc} • LÁI ĐẾN MÁY TÁI CHẾ`;
            color = 0x176b3a;
            accent = 0xffe58a;
        }

        this.playerStatusText.setText(message);
        this.playerStatusPill.clear();
        this.playerStatusPill.fillStyle(color, 0.9);
        this.playerStatusPill.fillRoundedRect(this.cameras.main.width / 2 - 300, this.cameras.main.height - 215, 600, 44, 22);
        this.playerStatusPill.lineStyle(2, accent, 0.9);
        this.playerStatusPill.strokeRoundedRect(this.cameras.main.width / 2 - 300, this.cameras.main.height - 215, 600, 44, 22);
    }

    showToast(msg) {
        const floatText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 200, msg, {
            font: 'bold 24px Inter',
            fill: '#ff0000',
            stroke: '#ffffff',
            strokeThickness: 4
        }).setOrigin(0.5).setDepth(6000);

        this.tweens.add({
            targets: floatText,
            y: floatText.y - 50,
            alpha: 0,
            duration: 1500,
            ease: 'Cubic.Out',
            onComplete: () => floatText.destroy()
        });
    }

    highlightSelected(container) {
        this.buttons.forEach(b => b.setScale(1));
        container.setScale(1.2);
    }

    setupInputs() {
        this.input.addPointer(1); // Enable multi-touch for pinch zoom
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W,A,S,D');

        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            let zoom = this.cameras.main.zoom;
            zoom -= deltaY * 0.001;
            zoom = Phaser.Math.Clamp(zoom, 0.4, 3);
            this.cameras.main.zoom = zoom;
        });

        this.input.on('pointerdown', (pointer, currentlyOver) => {
            // Check joystick bounds (screen coords)
            if (!this.isOverlayOpen() && !this.minigameMenu.visible) {
                const dist = Phaser.Math.Distance.Between(pointer.x, pointer.y, this.joystickBase.x, this.joystickBase.y);
                if (dist < 100) {
                    this.joystickPointer = pointer;
                    this.updateJoystick(pointer);
                    return;
                }
            }

            // Flag if pointerdown started on a UI element
            if (currentlyOver && currentlyOver.length > 0) {
                pointer.startedOnUI = true;
            } else {
                pointer.startedOnUI = false;
            }
        });

        this.input.on('pointermove', (pointer) => {
            if (this.joystickPointer === pointer) {
                this.updateJoystick(pointer);
                return;
            }

            // Pinch zoom
            if (this.input.pointer1.isDown && this.input.pointer2.isDown) {
                let dist = Phaser.Math.Distance.BetweenPoints(this.input.pointer1, this.input.pointer2);
                if (!this.prevPinchDist) {
                    this.prevPinchDist = dist;
                } else {
                    let delta = dist - this.prevPinchDist;
                    let zoom = this.cameras.main.zoom;
                    zoom += delta * 0.005;
                    zoom = Phaser.Math.Clamp(zoom, 0.4, 3);
                    this.cameras.main.zoom = zoom;
                    this.prevPinchDist = dist;
                }
                return;
            } else {
                this.prevPinchDist = null;
            }
        });

        this.input.on('pointerup', (pointer, currentlyOver) => {
            if (this.joystickPointer === pointer) {
                this.joystickPointer = null;
                this.joystickThumb.setPosition(this.joystickBase.x, this.joystickBase.y);
                this.joystickVector = { x: 0, y: 0 };
                return;
            }

            if (pointer.startedOnUI || this.isOverlayOpen() || this.minigameMenu.visible) return;
            if (currentlyOver && currentlyOver.length > 0) return;

            // Prevent placing if clicking UI bounds
            if (pointer.y > this.cameras.main.height - 150) return;
            if (pointer.y < 120) return; // Top HUD

            // Use pointer.worldX/worldY because map might be panned/zoomed
            const gridPos = this.getGridPos(pointer.worldX, pointer.worldY);
            if (!gridPos) return;

            const cell = this.grid[gridPos.x][gridPos.y];
            if (cell.building) {
                if (cell.building.getData('isDecor')) {
                    this.hideSpeechBubble();
                    this.selectedBuilding = null;
                } else if (this.selectedBuilding === cell.building) {
                    this.upgradeBuilding(cell.building);
                } else {
                    this.selectBuilding(cell.building);
                }
            } else if (this.selectedBuildingType) {
                this.placeBuilding(gridPos.x, gridPos.y);
            } else if (this.selectedDecorType) {
                this.placeDecor(gridPos.x, gridPos.y);
            } else if (cell.hasTrash) {
                const trashObj = this.landTrash.find(t => t.getData('cell') === cell);
                if (trashObj) {
                    this.showTrashInfo(trashObj.getData('type'));
                }
                this.selectedBuilding = null;
                this.hideSpeechBubble();
            } else {
                this.selectedBuilding = null;
                this.hideSpeechBubble();
            }
        });
    }

    updateJoystick(pointer) {
        let dx = pointer.x - this.joystickBase.x;
        let dy = pointer.y - this.joystickBase.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let maxDist = 80;

        if (dist > maxDist) {
            dx = (dx / dist) * maxDist;
            dy = (dy / dist) * maxDist;
        }

        this.joystickThumb.setPosition(this.joystickBase.x + dx, this.joystickBase.y + dy);
        this.joystickVector.x = dx / maxDist;
        this.joystickVector.y = dy / maxDist;
    }

    isOverlayOpen() {
        return !!(
            (this.quizMenu && this.quizMenu.visible) ||
            (this.researchMenu && this.researchMenu.visible) ||
            (this.libraryMenu && this.libraryMenu.visible) ||
            (this.exitMenu && this.exitMenu.visible) ||
            (this.matchSetupMenu && this.matchSetupMenu.visible) ||
            (this.trashInfoMenu && this.trashInfoMenu.visible)
        );
    }

    getGridPos(x, y) {
        const startX = this.islandStartX;
        const startY = this.islandStartY;
        const tw = CONFIG.TILE_WIDTH * this.islandGridScale;
        const th = CONFIG.TILE_HEIGHT * this.islandGridScale;

        // Invert the same isometric projection used to draw the placement grid.
        const dx = x - startX;
        const dy = y - startY;

        const gridX = Math.round((dx / (tw / 2) + dy / (th / 2)) / 2);
        const gridY = Math.round((dy / (th / 2) - dx / (tw / 2)) / 2);

        if (gridX >= 0 && gridX < CONFIG.GRID_SIZE && gridY >= 0 && gridY < CONFIG.GRID_SIZE) {
            return { x: gridX, y: gridY };
        }
        return null;
    }

    getDepthForCell(cell, offset = 0) {
        return (cell.x + cell.y) * 10 + offset;
    }

    clampPlayerToIsland() {
        const startX = this.islandStartX;
        const startY = this.islandStartY;
        const halfTileWidth = (CONFIG.TILE_WIDTH * this.islandGridScale) / 2;
        const halfTileHeight = (CONFIG.TILE_HEIGHT * this.islandGridScale) / 2;
        const dx = this.player.x - startX;
        const dy = this.player.y - startY;
        const rawGridX = (dx / halfTileWidth + dy / halfTileHeight) / 2;
        const rawGridY = (dy / halfTileHeight - dx / halfTileWidth) / 2;
        const min = CONFIG.PLAYER_BOUNDARY_MARGIN;
        const max = CONFIG.GRID_SIZE - 1 - min;
        const gridX = Phaser.Math.Clamp(rawGridX, min, max);
        const gridY = Phaser.Math.Clamp(rawGridY, min, max);

        this.player.x = startX + (gridX - gridY) * halfTileWidth;
        this.player.y = startY + (gridX + gridY) * halfTileHeight;
        return { gridX, gridY };
    }

    placeDecor(gx, gy) {
        const cell = this.grid[gx][gy];
        if (!cell.isBuildable || cell.building) {
            this.showToast('Chọn ô đất trống trong vùng đảo!');
            return;
        }
        if (this.gameMode === 'multi' && cell.ownerIndex !== this.myIndex) {
            this.showToast('Bạn chỉ được đặt ở khu vực của mình!');
            return;
        }
        if (cell.hasTrash) {
            this.showToast('Phải dọn rác trước khi đặt đồ trang trí!');
            return;
        }

        if (this.ecoPoints >= this.selectedDecorType.costEco) {
            this.ecoPoints -= this.selectedDecorType.costEco;
            this.sound.play('build_sfx');

            // Remove polluted decor if it exists
            if (cell.pollutedDecor) {
                cell.pollutedDecor.destroy();
                cell.pollutedDecor = null;
            }

            const d = this.add.image(cell.posX, cell.posY - 10, this.selectedDecorType.key).setScale(0.01).setAlpha(0.2);
            d.setDepth(this.getDepthForCell(cell, 4));

            // Decor belongs to clean layer visually (masked so it reveals nicely)
            d.setMask(this.geometryMask);

            this.buildingGroup.add(d);
            cell.building = d; // Prevent placing something else on this tile
            d.setData('isDecor', true);

            this.dustEmitter.explode(10, cell.posX, cell.posY);

            this.tweens.add({
                targets: d,
                scale: 0.12,
                alpha: 1,
                duration: 600,
                ease: 'Back.Out'
            });

            const decorKey = this.selectedDecorType.key;
            this.selectedDecorType = null;
            this.highlightSelected({ setScale: () => { } }); // clear highlight

            this.updateHUD();

            if (this.gameMode === 'multi') {
                this.roomChannel.send({
                    type: 'broadcast',
                    event: 'decor_placed',
                    payload: {
                        id: this.myId,
                        gx: gx,
                        gy: gy,
                        key: decorKey
                    }
                });
            }
        } else {
            // Not enough points visual feedback
            const floatText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 100, 'Không đủ Eco Points!', {
                font: 'bold 20px Inter',
                fill: '#ff0000',
                stroke: '#000000',
                strokeThickness: 4
            }).setOrigin(0.5).setDepth(4000);

            this.tweens.add({
                targets: floatText,
                y: floatText.y - 30,
                alpha: 0,
                duration: 1000,
                ease: 'Cubic.Out',
                onComplete: () => floatText.destroy()
            });
        }
    }

    placeBuilding(gx, gy) {
        const cell = this.grid[gx][gy];
        if (!cell.isBuildable || cell.building) {
            this.showToast('Chọn ô đất trống trong vùng đảo!');
            return;
        }
        if (this.gameMode === 'multi' && cell.ownerIndex !== this.myIndex) {
            this.showToast('Bạn chỉ được xây nhà máy ở khu vực của mình!');
            return;
        }
        if (cell.hasTrash) {
            this.showToast('Phải dọn rác trước khi xây dựng!');
            return;
        }

        if (this.money >= this.selectedBuildingType.cost) {
            this.money -= this.selectedBuildingType.cost;
            this.sound.play('build_sfx');

            // Hooks cho Quest & Tutorial
            if (this.selectedBuildingType.name === 'Pin Mặt Trời' || this.selectedBuildingType.name === 'Tua-bin Gió' || this.selectedBuildingType.name === 'TT Nghiên Cứu') {
                this.updateQuestProgress('q2', 1);
            }
            if (this.tutorialStep === 1) this.advanceTutorial();

            // Remove polluted decor if it exists
            if (cell.pollutedDecor) {
                cell.pollutedDecor.destroy();
                cell.pollutedDecor = null;
            }

            const b = this.add.image(cell.posX, cell.posY + 18, this.selectedBuildingType.key).setScale(0.05).setAlpha(0.2);
            b.setData({
                ownerIndex: this.gameMode === 'multi' ? this.myIndex : 0,
                key: this.selectedBuildingType.key,
                name: this.selectedBuildingType.name,
                level: 1,
                baseCleanRate: this.selectedBuildingType.cleanRate,
                cleanRate: this.selectedBuildingType.cleanRate,
                baseIncomeRate: this.selectedBuildingType.incomeRate,
                incomeRate: this.selectedBuildingType.incomeRate,
                baseEcoRate: this.selectedBuildingType.ecoRate,
                ecoRate: this.selectedBuildingType.ecoRate,
                isProcessor: this.selectedBuildingType.isProcessor,
                processType: this.selectedBuildingType.processType,
                maxKey: this.selectedBuildingType.maxKey || null,
                isEvolved: false,
                cell: cell
            });
            b.setDepth(this.getDepthForCell(cell, 5));
            b.setData('constructionScale', 0.1);

            this.buildingGroup.add(b);
            // Buildings are NOT masked so they are always visible
            // b.setMask(this.geometryMask);

            cell.building = b;
            this.playConstructionEffect(b, cell.posX, cell.posY);
            this.buildings.push(b);
            const buildingKey = this.selectedBuildingType.key;
            this.selectedBuilding = b;
            this.selectedBuildingType = null;

            this.updateHUD();
            window.ProgressLogger.logProgress('building_placed', { type: b.getData('key') });

            if (this.gameMode === 'multi') {
                this.roomChannel.send({
                    type: 'broadcast',
                    event: 'building_placed',
                    payload: {
                        id: this.myId,
                        gx: gx,
                        gy: gy,
                        key: buildingKey
                    }
                });
            }

            this.checkFullMapWinCondition();
        } else {
            this.showToast('Không đủ tiền!');
        }
    }

    checkFullMapWinCondition() {
        if (this.gameState !== 'PLAYING' || this.gameMode === 'multi') return;

        let allFilled = true;
        for (let x = 1; x < CONFIG.GRID_SIZE - 1; x++) {
            for (let y = 1; y < CONFIG.GRID_SIZE - 1; y++) {
                const cell = this.grid[x][y];
                if (cell.isBuildable && !cell.building) {
                    allFilled = false;
                    break;
                }
            }
            if (!allFilled) break;
        }

        if (allFilled) {
            // Player filled the entire map!
            this.cleanliness = 100;
            this.updateMask();
            this.updateHUD();

            // Clear remaining land trash just in case
            this.landTrash.forEach(t => t.destroy());
            this.landTrash = [];

            // Add massive victory bonus
            this.money += 5000;
            this.ecoPoints += 5000;

            const floatText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 100, 'ĐÃ PHỦ XANH TOÀN BỘ ĐẢO!', {
                font: 'bold 48px Inter', fill: '#00ff00', stroke: '#000000', strokeThickness: 6
            }).setOrigin(0.5).setDepth(6000);

            this.tweens.add({
                targets: floatText,
                y: floatText.y - 50,
                alpha: 0,
                duration: 4000,
                ease: 'Cubic.Out',
                onComplete: () => floatText.destroy()
            });

            this.time.delayedCall(2000, () => {
                this.endMatch();
            });
        }
    }

    playConstructionEffect(building, x, y) {
        const foundation = this.add.ellipse(x, y + 22, 100, 28, 0x5c4634, 0.45)
            .setDepth(building.depth - 1)
            .setScale(0.3, 0.6);
        const blueprint = this.add.rectangle(x, y - 25, 105, 120, 0x9ee9ff, 0.18)
            .setStrokeStyle(2, 0x9ee9ff, 0.65)
            .setDepth(building.depth + 1)
            .setAlpha(0.75);
        const label = this.add.text(x, y + 52, 'BUILDING…', {
            font: 'bold 13px Inter',
            fill: '#ffffff',
            stroke: '#1a2a32',
            strokeThickness: 3
        }).setOrigin(0.5).setDepth(building.depth + 2);

        this.constructionGroup.addMultiple([foundation, blueprint, label]);
        this.dustEmitter.explode(12, x, y + 18);

        this.tweens.add({
            targets: building,
            x: x,
            y: y - 10,
            scale: 0.1,
            alpha: 1,
            duration: 700,
            ease: 'Back.Out'
        });
        this.tweens.add({
            targets: foundation,
            scaleX: 1,
            scaleY: 1,
            alpha: 0,
            duration: 850,
            ease: 'Cubic.Out',
            onComplete: () => foundation.destroy()
        });
        this.tweens.add({
            targets: blueprint,
            alpha: 0,
            scaleX: 1.12,
            scaleY: 1.12,
            duration: 650,
            ease: 'Cubic.Out',
            onComplete: () => blueprint.destroy()
        });
        this.tweens.add({
            targets: label,
            y: y - 70,
            alpha: 0,
            duration: 800,
            ease: 'Cubic.Out',
            onComplete: () => label.destroy()
        });
    }

    updateHUD() {
        const safeMoney = Math.floor(isNaN(this.money) ? 0 : (this.money || 0));
        const safeEco = Math.floor(isNaN(this.ecoPoints) ? 0 : (this.ecoPoints || 0));
        const safeClean = Math.floor(isNaN(this.cleanliness) ? 0 : (this.cleanliness || 0));

        this.moneyText.setText(`$${safeMoney}`);
        this.ecoPointsText.setText(`${safeEco}`);
        this.cleanlinessValueText.setText(`${safeClean}%`);

        this.cleanProgressBar.clear();
        this.cleanProgressBar.fillStyle(0x32cd32, 1);
        const barWidth = Math.max(0, 178 * (safeClean / 100));
        if (barWidth > 0) {
            this.cleanProgressBar.fillRoundedRect(21, 146, barWidth, 13, 6);
        }

        if (this.trashCountText) {
            const count = this.landTrash.length;
            this.trashCountText.setText(`${count}/${CONFIG.MAX_TRASH_ALLOWED}`);
            if (count >= CONFIG.MAX_TRASH_ALLOWED * 0.8) {
                this.trashCountText.setFill('#ff0000');
            } else {
                this.trashCountText.setFill('#ffaa00');
            }
        }

        // Hide joystick when overlays are open
        const showJoystick = !this.isOverlayOpen() && !this.minigameMenu.visible && this.gameState === 'PLAYING';
        if (this.joystickBase) this.joystickBase.setVisible(showJoystick);
        if (this.joystickThumb) this.joystickThumb.setVisible(showJoystick);

        this.updateSelectionHUD();
    }

    createLibraryMenu() {
        this.libraryMenu = this.add.container(0, 0).setDepth(3000).setVisible(false).setScrollFactor(0);

        this.libraryOverlay = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.8)
            .setInteractive();

        const panelWidth = 780;
        const panelHeight = 620;
        const panelX = (this.cameras.main.width - panelWidth) / 2;
        const panelY = (this.cameras.main.height - panelHeight) / 2;

        this.libraryBg = this.add.graphics();
        this.libraryBg.fillStyle(0xfff8ee, 1);
        this.libraryBg.fillRoundedRect(panelX, panelY, panelWidth, panelHeight, 16);
        this.libraryBg.lineStyle(4, 0x228b22);
        this.libraryBg.strokeRoundedRect(panelX, panelY, panelWidth, panelHeight, 16);

        const title = this.add.text(this.cameras.main.width / 2, panelY + 30, '📚 THƯ VIỆN SINH THÁI', {
            font: 'bold 28px Inter',
            fill: '#228b22'
        }).setOrigin(0.5);

        const closeBtn = this.add.text(panelX + panelWidth - 30, panelY + 30, 'X', {
            font: 'bold 26px Inter', fill: '#ff0000'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        closeBtn.on('pointerdown', () => {
            this.libraryMenu.setVisible(false);
        });

        // Nút Xem Hướng Dẫn chi tiết
        const tutorialBtnBg = this.add.graphics();
        tutorialBtnBg.fillStyle(0x2e8b57, 1);
        tutorialBtnBg.fillRoundedRect(panelX + 30, panelY + 65, 180, 40, 8);
        const tutorialBtnTxt = this.add.text(panelX + 120, panelY + 85, '📖 HƯỚNG DẪN', { font: 'bold 16px Inter', fill: '#ffffff' }).setOrigin(0.5);
        const tutorialHit = this.add.rectangle(panelX + 120, panelY + 85, 180, 40, 0x0, 0).setInteractive({ useHandCursor: true });
        tutorialHit.on('pointerdown', () => {
            this.showTutorial();
        });

        // Tutorial summary text
        const tutorialTxt = this.add.text(this.cameras.main.width / 2 + 80, panelY + 85,
            "Mục tiêu: Dọn sạch 100% ô nhiễm trên đảo bằng cách thu gom rác và xây dựng máy tái chế.", {
            font: 'italic 15px Inter',
            fill: '#333333',
            align: 'left'
        }).setOrigin(0.5);

        this.libraryMenu.add([this.libraryOverlay, this.libraryBg, title, closeBtn, tutorialBtnBg, tutorialBtnTxt, tutorialHit, tutorialTxt]);

        // Trash Info List with background cards and matching guides
        const listY = panelY + 300;
        const colWidth = panelWidth / 4;

        TRASH_TYPES.forEach((trash, idx) => {
            const x = panelX + 30 + (colWidth / 2) + idx * (colWidth - 15);

            // Card background
            const card = this.add.graphics();
            card.fillStyle(0xe8f5e9, 1);
            card.fillRoundedRect(x - 90, listY - 80, 180, 370, 12);
            card.lineStyle(2, 0x2e8b57);
            card.strokeRoundedRect(x - 90, listY - 80, 180, 370, 12);

            // Trash Icon & Name
            const icon = this.add.image(x, listY - 30, trash.key).setScale(0.12);
            const name = this.add.text(x, listY + 20, trash.name, { font: 'bold 16px Inter', fill: '#006400' }).setOrigin(0.5);
            const desc = this.add.text(x, listY + 60, trash.desc, { font: '10px Inter', fill: '#333333', align: 'center', wordWrap: { width: 160 } }).setOrigin(0.5);

            // Arrow indicator
            const arrow = this.add.text(x, listY + 115, '⬇️', { font: '20px Inter', fill: '#000000' }).setOrigin(0.5);

            // Required Processor
            const processor = BUILDING_TYPES.find(b => (b.processType === trash.type) || (b.key.startsWith(trash.type)));
            let extras = [];
            if (processor) {
                const procIcon = this.add.image(x - (processor.maxKey ? 20 : 0), listY + 160, processor.key).setScale(0.06);
                const procName = this.add.text(x, listY + 200, `Máy: ${processor.name}`, { font: 'bold 14px Inter', fill: '#333', align: 'center' }).setOrigin(0.5);

                if (processor.maxKey) {
                    const evolveArrow = this.add.text(x + 10, listY + 160, '→', { font: 'bold 16px Inter', fill: '#2e8b57' }).setOrigin(0.5);
                    const maxIcon = this.add.image(x + 35, listY + 160, processor.maxKey).setScale(0.06);
                    extras.push(evolveArrow, maxIcon);
                }

                // Unlock & Upgrade Info
                const tech = TECH_TREE.find(t => t.id === processor.unlockReq);
                const unlockStr = tech ? `Yêu cầu: ${tech.name}` : `Yêu cầu: Có sẵn`;
                const unlockColor = tech ? '#b22222' : '#2e8b57';
                const reqLabel = this.add.text(x, listY + 230, unlockStr, { font: 'bold 11px Inter', fill: unlockColor, align: 'center', wordWrap: { width: 170 } }).setOrigin(0.5);

                const upgradeStr = `Max Lv.${CONFIG.MAX_BUILDING_LEVEL} (+${CONFIG.UPGRADE_OUTPUT_MULTIPLIER * 100}%/Lv) → Tiến hóa!`;
                const upgradeLabel = this.add.text(x, listY + 260, upgradeStr, { font: 'bold 11px Inter', fill: '#0000ff', align: 'center', wordWrap: { width: 170 } }).setOrigin(0.5);

                extras.push(procIcon, procName, reqLabel, upgradeLabel);
            }

            this.libraryMenu.add([card, icon, name, desc, arrow, ...extras]);
        });
    }

    createTrashInfoMenu() {
        this.trashInfoMenu = this.add.container(0, 0).setDepth(4500).setVisible(false).setScrollFactor(0);
        this.trashInfoOverlay = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.7).setInteractive();

        const pw = 450, ph = 280;
        const px = this.cameras.main.width / 2;
        const py = this.cameras.main.height / 2;

        this.trashInfoBg = this.add.graphics();
        this.trashInfoBg.fillStyle(0x1a2a32, 1);
        this.trashInfoBg.fillRoundedRect(px - pw / 2, py - ph / 2, pw, ph, 16);
        this.trashInfoBg.lineStyle(4, 0x32cd32);
        this.trashInfoBg.strokeRoundedRect(px - pw / 2, py - ph / 2, pw, ph, 16);

        this.trashInfoIcon = this.add.image(px - 140, py - 40, 'trash_organic').setScale(0.2);
        this.trashInfoTitle = this.add.text(px - 60, py - 90, 'TÊN RÁC', { font: 'bold 24px Inter', fill: '#ffcc00' });
        this.trashInfoDesc = this.add.text(px - 60, py - 50, 'Mô tả rác...', { font: '14px Inter', fill: '#ffffff', wordWrap: { width: 250 } });

        const btnBg = this.add.graphics();
        btnBg.fillStyle(0xdc143c, 1);
        btnBg.fillRoundedRect(px - 60, py + ph / 2 - 50, 120, 35, 8);
        const btnTxt = this.add.text(px, py + ph / 2 - 32, 'ĐÓNG', { font: 'bold 16px Inter', fill: '#ffffff' }).setOrigin(0.5);
        const hitArea = this.add.rectangle(px, py + ph / 2 - 32, 120, 35, 0x0, 0).setInteractive({ useHandCursor: true });
        hitArea.on('pointerdown', () => this.trashInfoMenu.setVisible(false));

        this.trashInfoMenu.add([this.trashInfoOverlay, this.trashInfoBg, this.trashInfoIcon, this.trashInfoTitle, this.trashInfoDesc, btnBg, btnTxt, hitArea]);
    }

    showTrashInfo(typeId) {
        const trash = TRASH_TYPES.find(t => t.type === typeId);
        if (!trash) return;

        this.trashInfoIcon.setTexture(trash.key);
        this.trashInfoTitle.setText(trash.name.toUpperCase());
        this.trashInfoDesc.setText(trash.desc);

        this.trashInfoMenu.setVisible(true);
    }

    createShopMenu() {
        this.shopMenu = this.add.container(0, 0).setDepth(4500).setVisible(false).setScrollFactor(0);
        this.shopOverlay = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.8).setInteractive();

        const pw = 600, ph = 400;
        const px = this.cameras.main.width / 2;
        const py = this.cameras.main.height / 2;

        this.shopBg = this.add.graphics();
        this.shopBg.fillStyle(0x1a2a32, 1);
        this.shopBg.fillRoundedRect(px - pw / 2, py - ph / 2, pw, ph, 16);
        this.shopBg.lineStyle(4, 0x9400d3);
        this.shopBg.strokeRoundedRect(px - pw / 2, py - ph / 2, pw, ph, 16);

        this.shopTitle = this.add.text(px, py - ph / 2 + 30, '🛒 CỬA HÀNG SKIN ROBOT', { font: 'bold 24px Inter', fill: '#9400d3' }).setOrigin(0.5);
        
        const closeBtn = this.add.text(px + pw / 2 - 30, py - ph / 2 + 30, 'X', { font: 'bold 24px Inter', fill: '#ff0000' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        closeBtn.on('pointerdown', () => this.shopMenu.setVisible(false));

        this.shopMenu.add([this.shopOverlay, this.shopBg, this.shopTitle, closeBtn]);
        
        const skins = [
            { id: 'robot_skin_panda', name: 'Gấu Trúc Sinh Thái', price: 1500, priceType: 'money', buff: 'Tốc độ +10%' },
            { id: 'robot_skin_mecha', name: 'Mecha Vệ Sinh', price: 500, priceType: 'eco', buff: 'Sức chứa +2' }
        ];

        const uid = localStorage.getItem('eco_userid') || 'guest';
        this.unlockedSkins = JSON.parse(localStorage.getItem(`eco_unlocked_skins_${uid}`)) || [];

        skins.forEach((skin, idx) => {
            const sx = px - 150 + idx * 300;
            const sy = py + 20;

            const card = this.add.graphics();
            card.fillStyle(0x2c3e50, 1);
            card.fillRoundedRect(sx - 120, sy - 140, 240, 280, 12);
            card.lineStyle(2, 0x9400d3);
            card.strokeRoundedRect(sx - 120, sy - 140, 240, 280, 12);

            const icon = this.add.image(sx, sy - 60, skin.id).setScale(0.15);
            const name = this.add.text(sx, sy + 30, skin.name, { font: 'bold 16px Inter', fill: '#ffffff' }).setOrigin(0.5);
            const buff = this.add.text(sx, sy + 60, skin.buff, { font: '14px Inter', fill: '#9cff75' }).setOrigin(0.5);
            
            const btnBg = this.add.graphics();
            const isUnlocked = this.unlockedSkins.includes(skin.id);
            const btnY = sy + 100;
            const priceStr = skin.priceType === 'money' ? `$${skin.price}` : `${skin.price}🌱`;
            const btnText = this.add.text(sx, btnY, isUnlocked ? (this.playerSkin === skin.id ? 'ĐANG DÙNG' : 'TRANG BỊ') : `MUA (${priceStr})`, { font: 'bold 16px Inter', fill: '#fff' }).setOrigin(0.5);
            btnBg.fillStyle(isUnlocked ? 0x555555 : (skin.priceType === 'money' ? 0xffcc00 : 0x32cd32), 1);
            btnBg.fillRoundedRect(sx - 80, btnY - 20, 160, 40, 8);

            const hitArea = this.add.rectangle(sx, btnY, 160, 40, 0x0, 0).setInteractive({ useHandCursor: true });
            hitArea.on('pointerdown', () => {
                if (this.unlockedSkins.includes(skin.id)) {
                    this.equipSkin(skin.id);
                    this.shopMenu.setVisible(false);
                    return;
                }
                
                if (skin.priceType === 'money') {
                    if (this.money >= skin.price) {
                        this.money -= skin.price;
                        this.unlockSkin(skin.id);
                        btnText.setText('TRANG BỊ');
                        btnBg.clear();
                        btnBg.fillStyle(0x555555, 1);
                        btnBg.fillRoundedRect(sx - 80, btnY - 20, 160, 40, 8);
                        this.updateHUD();
                    } else {
                        this.showToast('Không đủ tiền!');
                    }
                } else {
                    if (this.ecoPoints >= skin.price) {
                        this.ecoPoints -= skin.price;
                        this.unlockSkin(skin.id);
                        btnText.setText('TRANG BỊ');
                        btnBg.clear();
                        btnBg.fillStyle(0x555555, 1);
                        btnBg.fillRoundedRect(sx - 80, btnY - 20, 160, 40, 8);
                        this.updateHUD();
                    } else {
                        this.showToast('Không đủ Eco Points!');
                    }
                }
            });

            this.shopMenu.add([card, icon, name, buff, btnBg, btnText, hitArea]);
        });
    }

    openShopMenu() {
        this.shopMenu.setVisible(true);
    }

    unlockSkin(id) {
        if (!this.unlockedSkins.includes(id)) {
            this.unlockedSkins.push(id);
            const uid = localStorage.getItem('eco_userid') || 'guest';
            localStorage.setItem(`eco_unlocked_skins_${uid}`, JSON.stringify(this.unlockedSkins));
            this.showToast('Mua thành công!');
            this.updateQuestProgress('q8', 1);
        }
    }

    equipSkin(id) {
        this.playerSkin = id;
        const uid = localStorage.getItem('eco_userid') || 'guest';
        localStorage.setItem(`eco_player_skin_${uid}`, id);
        this.player.setTexture(id);
        this.player.setScale(0.15);
        this.showToast('Đã trang bị skin!');
    }

    createLabMenu() {
        this.labMenu = this.add.container(0, 0).setDepth(4500).setVisible(false).setScrollFactor(0);
        this.labOverlay = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.8).setInteractive();

        const pw = 500, ph = 350;
        const px = this.cameras.main.width / 2;
        const py = this.cameras.main.height / 2;

        this.labBg = this.add.graphics();
        this.labBg.fillStyle(0x002222, 1);
        this.labBg.fillRoundedRect(px - pw / 2, py - ph / 2, pw, ph, 16);
        this.labBg.lineStyle(4, 0x00ffff);
        this.labBg.strokeRoundedRect(px - pw / 2, py - ph / 2, pw, ph, 16);

        this.labTitle = this.add.text(px, py - ph / 2 + 30, '🧪 PHÒNG THÍ NGHIỆM ẢO', { font: 'bold 24px Inter', fill: '#00ffff' }).setOrigin(0.5);
        this.labDesc = this.add.text(px, py - ph / 2 + 70, 'Ghép 3 vật liệu khác nhau để chế tạo Pin Mặt Trời!', { font: '14px Inter', fill: '#ffffff' }).setOrigin(0.5);

        const closeBtn = this.add.text(px + pw / 2 - 30, py - ph / 2 + 30, 'X', { font: 'bold 24px Inter', fill: '#ff0000' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        closeBtn.on('pointerdown', () => this.labMenu.setVisible(false));

        this.labMenu.add([this.labOverlay, this.labBg, this.labTitle, this.labDesc, closeBtn]);

        // Materials to choose from
        const materials = [
            { id: 'mat_metal', name: 'Kim Loại', color: 0x888888, icon: 'single_trash_soda_can' },
            { id: 'mat_glass', name: 'Kính/Nhựa', color: 0x00ffff, icon: 'single_trash_plastic_bottle' },
            { id: 'mat_circuit', name: 'Mạch Điện', color: 0xffaa00, icon: 'single_trash_circuit_board_broken' }
        ];

        this.labCraftingSlots = [];
        this.labCurrentCrafting = [];

        // Draw 3 empty slots
        for (let i = 0; i < 3; i++) {
            const slotX = px - 100 + i * 100;
            const slotY = py - 30;
            
            const slotBg = this.add.graphics();
            slotBg.fillStyle(0x111111, 1);
            slotBg.fillRoundedRect(slotX - 35, slotY - 35, 70, 70, 8);
            slotBg.lineStyle(2, 0x444444);
            slotBg.strokeRoundedRect(slotX - 35, slotY - 35, 70, 70, 8);
            
            const slotText = this.add.text(slotX, slotY, '?', { font: 'bold 24px Inter', fill: '#555' }).setOrigin(0.5);
            
            this.labMenu.add([slotBg, slotText]);
            this.labCraftingSlots.push({ bg: slotBg, text: slotText, x: slotX, y: slotY });
        }

        // Draw 3 material buttons
        materials.forEach((mat, idx) => {
            const btnX = px - 150 + idx * 150;
            const btnY = py + 80;

            const btnBg = this.add.graphics();
            btnBg.fillStyle(0x224444, 1);
            btnBg.fillRoundedRect(btnX - 60, btnY - 30, 120, 60, 8);
            btnBg.lineStyle(2, mat.color);
            btnBg.strokeRoundedRect(btnX - 60, btnY - 30, 120, 60, 8);

            const matIcon = this.add.image(btnX, btnY - 10, mat.icon).setScale(0.12);
            const btnText = this.add.text(btnX, btnY + 18, mat.name, { font: 'bold 12px Inter', fill: '#fff', align: 'center' }).setOrigin(0.5);

            const hitArea = this.add.rectangle(btnX, btnY, 120, 60, 0x0, 0).setInteractive({ useHandCursor: true });
            hitArea.on('pointerdown', () => this.addLabMaterial(mat));

            this.labMenu.add([btnBg, matIcon, btnText, hitArea]);
        });
        
        // Reset button
        const resetBtn = this.add.text(px, py + 140, '🔄 Chế tạo lại', { font: '14px Inter', fill: '#ff8888' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        resetBtn.on('pointerdown', () => this.resetLab());
        this.labMenu.add(resetBtn);
    }

    openLabMenu() {
        this.resetLab();
        this.labMenu.setVisible(true);
    }

    addLabMaterial(mat) {
        if (this.labCurrentCrafting.length < 3) {
            const idx = this.labCurrentCrafting.length;
            this.labCurrentCrafting.push(mat);
            
            // Update slot UI
            const slot = this.labCraftingSlots[idx];
            slot.text.setText('✔️');
            slot.text.setColor('#00ff00');
            
            const icon = this.add.image(slot.x, slot.y - 5, mat.icon).setScale(0.15);
            this.labMenu.add(icon);
            slot.icon = icon;

            // Check win
            if (this.labCurrentCrafting.length === 3) {
                const hasMetal = this.labCurrentCrafting.find(m => m.id === 'mat_metal');
                const hasGlass = this.labCurrentCrafting.find(m => m.id === 'mat_glass');
                const hasCircuit = this.labCurrentCrafting.find(m => m.id === 'mat_circuit');
                
                if (hasMetal && hasGlass && hasCircuit) {
                    this.showToast('CHẾ TẠO THÀNH CÔNG: Pin Mặt Trời!');
                    
                    const panel = BUILDING_TYPES.find(b => b.key === 'solar_panel');
                    this.money += panel.cost;
                    this.updateHUD();
                    this.showFloatingText(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Nhận 1 Pin Mặt Trời (Quy đổi $100)', '#00ff00');
                    
                    this.time.delayedCall(1500, () => {
                        this.labMenu.setVisible(false);
                    });
                } else {
                    this.showToast('Công thức sai! Bạn cần đủ 3 vật liệu khác nhau.');
                    this.time.delayedCall(1000, () => this.resetLab());
                }
            }
        }
    }

    resetLab() {
        this.labCurrentCrafting = [];
        this.labCraftingSlots.forEach(slot => {
            slot.text.setText('?');
            slot.text.setColor('#555');
            if (slot.icon) {
                slot.icon.destroy();
                slot.icon = null;
            }
        });
    }

    checkRobotEvolution() {
        const totalUpgrades = (this.playerSpeedLevel - 1) + (this.playerCapLevel - 1);
        let targetKey = 'worker_robot';
        let evolutionMsg = '';

        if (this.playerSpeedLevel === 4 && this.playerCapLevel === 4) {
            targetKey = 'industrial_robot';
            evolutionMsg = 'ROBOT TIẾN HÓA CÔNG NGHIỆP TỐI THƯỢNG!';
        } else if (totalUpgrades >= 4) {
            targetKey = 'worker_robot_l3';
            evolutionMsg = 'ROBOT TIẾN HÓA BẬC CAO!';
        } else if (totalUpgrades >= 2) {
            targetKey = 'worker_robot_l2';
            evolutionMsg = 'ROBOT TIẾN HÓA BẬC TRUNG!';
        }

        let actualTargetKey = targetKey;
        if (this.playerSkin) actualTargetKey = this.playerSkin;

        if (this.player && this.player.texture.key !== actualTargetKey) {
            this.tweens.add({
                targets: this.player,
                scale: 0,
                duration: 400,
                ease: 'Back.In',
                onComplete: () => {
                    this.player.setTexture(actualTargetKey);
                    let newScale = targetKey === 'industrial_robot' ? 0.2 : 0.12;
                    if (this.playerSkin) newScale = 0.15; // Kích thước cố định cho skin
                    
                    if (targetKey === 'industrial_robot' && !this.isMaxEvolved) {
                        this.isMaxEvolved = true;
                        this.playerSpeed *= 1.2;
                        this.playerCap = 10;
                        this.updatePlayerStatus();
                    }
                    this.player.setScale(newScale);
                    this.tweens.add({
                        targets: this.player,
                        scale: newScale,
                        alpha: 1,
                        duration: 600,
                        ease: 'Back.Out'
                    });
                    this.dustEmitter.explode(30, this.player.x, this.player.y);
                    if (evolutionMsg) {
                        this.showFloatingText(this.player.x, this.player.y - 80, evolutionMsg, '#ffff00');
                    }
                }
            });
        }
    }

    openLibraryMenu() {
        this.libraryMenu.setVisible(true);
    }

    createExitMenu() {
        this.exitMenu = this.add.container(0, 0).setDepth(6000).setVisible(false).setScrollFactor(0);
        this.exitOverlay = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.85).setInteractive();

        const pw = 420, ph = 260;
        const px = this.cameras.main.width / 2;
        const py = this.cameras.main.height / 2;

        const bg = this.add.graphics();
        bg.fillStyle(0x1a2a32, 1);
        bg.fillRoundedRect(px - pw / 2, py - ph / 2, pw, ph, 16);
        bg.lineStyle(4, 0xdc143c);
        bg.strokeRoundedRect(px - pw / 2, py - ph / 2, pw, ph, 16);

        const title = this.add.text(px, py - ph / 2 + 45, '⏸ TẠM DỪNG', { font: 'bold 26px Inter', fill: '#ffcc00' }).setOrigin(0.5);
        const subtitle = this.add.text(px, py - ph / 2 + 90, 'Bạn muốn làm gì?', { font: '16px Inter', fill: '#ffffff' }).setOrigin(0.5);

        this.exitMenu.add([this.exitOverlay, bg, title, subtitle]);

        // Resume Button
        const resumeBg = this.add.graphics();
        resumeBg.fillStyle(0x32cd32, 1);
        resumeBg.fillRoundedRect(px - 150, py - 20, 300, 45, 10);
        const resumeTxt = this.add.text(px, py + 2, '▶ TIẾP TỤC CHƠI', { font: 'bold 18px Inter', fill: '#ffffff' }).setOrigin(0.5);
        const resumeHit = this.add.rectangle(px, py + 2, 300, 45, 0x0, 0).setInteractive({ useHandCursor: true });
        resumeHit.on('pointerdown', () => this.closeExitMenu());

        // Quit to Menu Button
        const quitBg = this.add.graphics();
        quitBg.fillStyle(0xdc143c, 1);
        quitBg.fillRoundedRect(px - 150, py + 40, 300, 45, 10);
        const quitTxt = this.add.text(px, py + 62, '⏹ THOÁT VỀ MENU', { font: 'bold 18px Inter', fill: '#ffffff' }).setOrigin(0.5);
        const quitHit = this.add.rectangle(px, py + 62, 300, 45, 0x0, 0).setInteractive({ useHandCursor: true });
        quitHit.on('pointerdown', () => {
            if (this.music) this.music.stop();
            this.scene.start('MainMenuScene');
        });

        this.exitMenu.add([resumeBg, resumeTxt, resumeHit, quitBg, quitTxt, quitHit]);
    }

    openExitMenu() {
        // Also pause the catching minigame timer if it happens to be running
        this.exitMenu.setVisible(true);
    }

    closeExitMenu() {
        this.exitMenu.setVisible(false);
    }

    createMinigame() {
        this.minigameMenu = this.add.container(0, 0).setDepth(3500).setVisible(false).setScrollFactor(0);
        this.minigameOverlay = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.9).setInteractive();

        this.minigameTitle = this.add.text(this.cameras.main.width / 2, 50, 'TRUNG TÂM GIẢI TRÍ', { font: 'bold 32px Inter', fill: '#ff8c00' }).setOrigin(0.5);
        this.minigameTimerText = this.add.text(this.cameras.main.width / 2, 100, 'Thời gian: 30s', { font: 'bold 24px Inter', fill: '#ffffff' }).setOrigin(0.5);
        this.minigameScoreText = this.add.text(this.cameras.main.width / 2, 140, 'Điểm: 0', { font: 'bold 24px Inter', fill: '#32cd32' }).setOrigin(0.5);

        this.minigameMenu.add([this.minigameOverlay, this.minigameTitle, this.minigameTimerText, this.minigameScoreText]);

        // --- Selection Container ---
        this.minigameSelectionContainer = this.add.container(0, 0);
        const px = this.cameras.main.width / 2;
        const py = this.cameras.main.height / 2;

        const selTitle = this.add.text(px, py - 100, 'CHỌN TRÒ CHƠI', { font: 'bold 28px Inter', fill: '#ffffff' }).setOrigin(0.5);

        // Game 1: Catch Trash
        const btn1Bg = this.add.graphics();
        btn1Bg.fillStyle(0x32cd32, 1);
        btn1Bg.fillRoundedRect(px - 490, py - 20, 300, 150, 16);
        const btn1Txt = this.add.text(px - 340, py + 55, 'HỨNG RÁC\n(Phân loại rác)', { font: 'bold 20px Inter', fill: '#ffffff', align: 'center' }).setOrigin(0.5);
        const hit1 = this.add.rectangle(px - 340, py + 55, 300, 150, 0x0, 0).setInteractive({ useHandCursor: true });
        hit1.on('pointerdown', () => {
            this.minigameSelectionContainer.setVisible(false);
            this.showMinigameLeaderboard();
        });

        // Game 2: Sea Cleanup
        const btn2Bg = this.add.graphics();
        btn2Bg.fillStyle(0x4682b4, 1);
        btn2Bg.fillRoundedRect(px - 150, py - 20, 300, 150, 16);
        const btn2Txt = this.add.text(px, py + 55, 'DỌN BIỂN\n(Bảo vệ đại dương)', { font: 'bold 20px Inter', fill: '#ffffff', align: 'center' }).setOrigin(0.5);
        const hit2 = this.add.rectangle(px, py + 55, 300, 150, 0x0, 0).setInteractive({ useHandCursor: true });
        hit2.on('pointerdown', () => {
            this.minigameSelectionContainer.setVisible(false);
            this.startSeaCleanupGame();
        });

        // Game 3: Lab Minigame
        const btn3Bg = this.add.graphics();
        btn3Bg.fillStyle(0x008080, 1);
        btn3Bg.fillRoundedRect(px + 190, py - 20, 300, 150, 16);
        const btn3Txt = this.add.text(px + 340, py + 55, 'THÍ NGHIỆM\n(Ghép Vật Liệu)', { font: 'bold 20px Inter', fill: '#ffffff', align: 'center' }).setOrigin(0.5);
        const hit3 = this.add.rectangle(px + 340, py + 55, 300, 150, 0x0, 0).setInteractive({ useHandCursor: true });
        hit3.on('pointerdown', () => {
            this.minigameMenu.setVisible(false);
            this.openLabMenu();
        });


        const closeSel = this.add.text(px, py + 200, '✖ ĐÓNG', { font: 'bold 22px Inter', fill: '#ff4444' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        closeSel.on('pointerdown', () => this.minigameMenu.setVisible(false));

        this.minigameSelectionContainer.add([selTitle, btn1Bg, btn1Txt, hit1, btn2Bg, btn2Txt, hit2, btn3Bg, btn3Txt, hit3, closeSel]);
        this.minigameMenu.add(this.minigameSelectionContainer);

        // Setup Bins Container
        this.minigameBinsContainer = this.add.container(this.cameras.main.width / 2, this.cameras.main.height - 120).setDepth(3502);

        this.bins = [];
        const binWidth = 130;

        const binData = [
            { type: 'organic', key: 'bin_organic', name: 'HỮU CƠ', x: -210 },
            { type: 'plastic', key: 'bin_plastic', name: 'NHỰA', x: -70 },
            { type: 'metal', key: 'bin_metal', name: 'KIM LOẠI', x: 70 },
            { type: 'electronic', key: 'bin_electronic', name: 'ĐIỆN TỬ', x: 210 }
        ];

        binData.forEach((b) => {
            const img = this.add.image(b.x, -15, b.key).setDisplaySize(binWidth, 155).setOrigin(0.5, 0.5);
            const labelBg = this.add.rectangle(b.x, 78, binWidth, 28, 0x000000, 0.65).setStrokeStyle(2, 0xffffff);
            const txt = this.add.text(b.x, 78, b.name, { font: 'bold 13px Inter', fill: '#ffffff' }).setOrigin(0.5);

            this.minigameBinsContainer.add([img, labelBg, txt]);
            this.bins.push({ type: b.type, x: b.x, width: binWidth });
        });

        // Also draggable by mouse/touch for players who prefer that
        this.minigameBinsContainer.setInteractive(new Phaser.Geom.Rectangle(-300, -100, 600, 200), Phaser.Geom.Rectangle.Contains);
        this.input.setDraggable(this.minigameBinsContainer);

        this.minigameMenu.add(this.minigameBinsContainer);

        this.minigameItemsContainer = this.add.container(0, 0).setDepth(3501);

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            if (gameObject === this.minigameBinsContainer) {
                gameObject.x = Phaser.Math.Clamp(dragX, 300, this.cameras.main.width - 300);
            }
        });

        this.createMinigameLeaderboard();
    }

    createMinigameLeaderboard() {
        this.minigameLeaderboardContainer = this.add.container(0, 0).setDepth(3505).setVisible(false).setScrollFactor(0);

        const px = this.cameras.main.width / 2;
        const py = this.cameras.main.height / 2;

        const bg = this.add.graphics();
        bg.fillStyle(0x1a2a32, 0.95);
        bg.fillRoundedRect(px - 200, py - 200, 400, 400, 16);
        bg.lineStyle(4, 0xff8c00);
        bg.strokeRoundedRect(px - 200, py - 200, 400, 400, 16);

        const title = this.add.text(px, py - 160, '🏆 BẢNG XẾP HẠNG HỨNG RÁC', { font: 'bold 20px Inter', fill: '#ff8c00' }).setOrigin(0.5);
        this.minigameLeaderboardContainer.add([bg, title]);

        this.minigameLeaderboardTexts = [];
        for (let i = 0; i < 5; i++) {
            const txt = this.add.text(px, py - 100 + i * 35, '', { font: '18px Inter', fill: '#ffffff' }).setOrigin(0.5);
            this.minigameLeaderboardTexts.push(txt);
            this.minigameLeaderboardContainer.add(txt);
        }

        // Start Button
        const btnBg = this.add.graphics();
        btnBg.fillStyle(0x32cd32, 1);
        btnBg.fillRoundedRect(px - 80, py + 80, 160, 40, 8);
        const btnTxt = this.add.text(px, py + 100, 'BẮT ĐẦU', { font: 'bold 18px Inter', fill: '#ffffff' }).setOrigin(0.5);
        const btnHitArea = this.add.rectangle(px, py + 100, 160, 40, 0x0, 0).setInteractive({ useHandCursor: true });
        btnHitArea.on('pointerdown', () => this.startMinigame());

        // Close Button
        const closeBtnBg = this.add.graphics();
        closeBtnBg.fillStyle(0xff0000, 1);
        closeBtnBg.fillRoundedRect(px - 80, py + 130, 160, 40, 8);
        const closeBtnTxt = this.add.text(px, py + 150, 'ĐÓNG', { font: 'bold 18px Inter', fill: '#ffffff' }).setOrigin(0.5);
        const closeHitArea = this.add.rectangle(px, py + 150, 160, 40, 0x0, 0).setInteractive({ useHandCursor: true });
        closeHitArea.on('pointerdown', () => {
            this.minigameMenu.setVisible(false);
            this.minigameItemsContainer.setVisible(false);
        });

        this.minigameLeaderboardContainer.add([btnBg, btnTxt, btnHitArea, closeBtnBg, closeBtnTxt, closeHitArea]);
        this.minigameMenu.add(this.minigameLeaderboardContainer);
    }

    updateMinigameLeaderboardDisplay() {
        let scores = JSON.parse(localStorage.getItem('eco_minigame_scores') || '[]');
        scores.sort((a, b) => b.score - a.score);

        for (let i = 0; i < 5; i++) {
            if (i < scores.length) {
                const prefix = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`;
                this.minigameLeaderboardTexts[i].setText(`${prefix} ${scores[i].name}: ${scores[i].score} điểm`);
            } else {
                this.minigameLeaderboardTexts[i].setText(`${i + 1}. ---`);
            }
        }
    }

    openMinigame() {
        this.minigameMenu.setVisible(true);
        this.minigameItemsContainer.setVisible(false);
        this.minigameActive = false;
        this.seaMinigameActive = false;
        this.showMinigameSelection();
    }

    showMinigameSelection() {
        this.minigameTitle.setText('TRUNG TÂM GIẢI TRÍ');
        this.minigameTimerText.setVisible(false);
        this.minigameScoreText.setVisible(false);
        this.minigameBinsContainer.setVisible(false);
        this.minigameLeaderboardContainer.setVisible(false);
        if (this.seaMinigameContainer) this.seaMinigameContainer.setVisible(false);

        this.minigameSelectionContainer.setVisible(true);
    }

    showMinigameLeaderboard() {
        this.minigameSelectionContainer.setVisible(false);
        this.minigameItemsContainer.setVisible(true);
        this.minigameTimerText.setVisible(false);
        this.minigameScoreText.setVisible(false);
        this.minigameBinsContainer.setVisible(false);

        this.updateMinigameLeaderboardDisplay();
        this.minigameLeaderboardContainer.setVisible(true);
    }

    startMinigame() {
        if (this.minigameActive) return;
        this.minigameTitle.setText('HỨNG RÁC');
        this.minigameLeaderboardContainer.setVisible(false);
        this.minigameTimerText.setVisible(true);
        this.minigameScoreText.setVisible(true);
        this.minigameBinsContainer.setVisible(true);

        this.minigameActive = true;
        this.minigameScore = 0;
        this.minigameTimer = 30000;
        this.minigameSpawnTimer = 0;
        this.minigameItemsArray = [];
        this.minigameScoreText.setText('Điểm: 0');
    }

    spawnMinigameTrash() {
        const trashType = TRASH_TYPES[Math.floor(Math.random() * TRASH_TYPES.length)];

        const variantKey = trashType.variants[Math.floor(Math.random() * trashType.variants.length)];
        const x = Phaser.Math.Between(this.cameras.main.width / 2 - 280, this.cameras.main.width / 2 + 280);
        const item = this.add.image(x, -50, variantKey).setScale(0.12);

        item.setData('trashType', trashType.type);

        this.minigameItemsContainer.add(item);
        this.minigameItemsArray.push(item);
    }

    endMinigame() {
        this.minigameActive = false;

        this.minigameItemsContainer.removeAll(true);
        this.minigameItemsArray = [];

        let scores = JSON.parse(localStorage.getItem('eco_minigame_scores') || '[]');
        const username = localStorage.getItem('eco_username') || 'Guest';
        scores.push({ name: username, score: this.minigameScore });
        scores.sort((a, b) => b.score - a.score);
        scores = scores.slice(0, 5);
        localStorage.setItem('eco_minigame_scores', JSON.stringify(scores));

        const rewardMoney = this.minigameScore * 30; // Increased reward to help start
        const rewardEco = this.minigameScore * 10;
        this.money += rewardMoney;
        this.ecoPoints += rewardEco;

        const floatText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, `HOÀN THÀNH!\n+$${rewardMoney} | +${rewardEco}🌱`, { font: 'bold 36px Inter', fill: '#ffcc00', align: 'center', stroke: '#000000', strokeThickness: 6 }).setOrigin(0.5).setDepth(5000);
        this.tweens.add({ targets: floatText, y: floatText.y - 100, alpha: 0, duration: 2500, onComplete: () => floatText.destroy() });

        this.updateHUD();
        this.showMinigameLeaderboard();
    }

    createSeaMinigame() {
        this.seaMinigameContainer = this.add.container(0, 0).setVisible(false).setDepth(3501);

        // Ocean background
        this.oceanBg = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, this.cameras.main.width, this.cameras.main.height, 0x006994, 0.95).setInteractive();
        this.seaMinigameContainer.add(this.oceanBg);

        // Ocean area (world coords for logic, but we'll center it)
        this.seaShip = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'eco_ship').setScale(0.2).setDepth(3503);
        this.seaItems = [];
        this.seaMinigameContainer.add(this.seaShip);

        this.minigameMenu.add(this.seaMinigameContainer);
    }

    startSeaCleanupGame() {
        this.seaMinigameActive = true;
        this.seaMinigameScore = 0;
        this.seaMinigameTimer = 30000;

        this.minigameTitle.setText('DỌN DẸP ĐẠI DƯƠNG');
        this.minigameTimerText.setVisible(true);
        this.minigameScoreText.setVisible(true);
        this.minigameScoreText.setText('Điểm: 0');

        this.seaMinigameContainer.setVisible(true);
        this.seaShip.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

        // Clear old items
        this.seaItems.forEach(i => i.destroy());
        this.seaItems = [];
    }

    spawnSeaTrash() {
        const types = ['oil_spill', 'sea_plastic_trash'];
        const type = types[Phaser.Math.Between(0, types.length - 1)];
        const x = Phaser.Math.Between(100, this.cameras.main.width - 100);
        const y = Phaser.Math.Between(200, this.cameras.main.height - 200);

        const item = this.add.image(x, y, type).setScale(0.15).setAlpha(0);

        // Thêm vận tốc trôi dạt ngẫu nhiên để tăng độ khó
        const vx = Phaser.Math.Between(-80, 80);
        const vy = Phaser.Math.Between(-80, 80);

        item.setData('type', type);
        item.setData('vx', vx);
        item.setData('vy', vy);

        this.tweens.add({ targets: item, alpha: 1, duration: 500 });

        this.seaMinigameContainer.add(item);
        this.seaItems.push(item);
    }

    endSeaMinigame() {
        this.seaMinigameActive = false;
        this.seaMinigameContainer.setVisible(false);
        this.seaItems.forEach(i => i.destroy());
        this.seaItems = [];

        // Cân bằng lại điểm thưởng
        const rewardMoney = this.seaMinigameScore * 2;
        const rewardEco = Math.floor(this.seaMinigameScore * 1);

        this.money += rewardMoney;
        this.ecoPoints += rewardEco;

        const floatText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, `ĐẠI DƯƠNG XANH HƠN!\n+$${rewardMoney} | +${rewardEco}🌱`, { font: 'bold 36px Inter', fill: '#00ccff', align: 'center', stroke: '#000000', strokeThickness: 6 }).setOrigin(0.5).setDepth(5000);
        this.tweens.add({ targets: floatText, y: floatText.y - 100, alpha: 0, duration: 2500, onComplete: () => floatText.destroy() });

        this.updateHUD();
        this.showMinigameSelection();
    }

    createChatUI() {
        this.chatOpen = false;
        this.unreadCount = 0;

        // --- Toggle Button (icon) at bottom-right ---
        this.chatToggleBtn = document.createElement('div');
        this.chatToggleBtn.style.position = 'absolute';
        this.chatToggleBtn.style.right = '20px';
        this.chatToggleBtn.style.bottom = '170px';
        this.chatToggleBtn.style.width = '50px';
        this.chatToggleBtn.style.height = '50px';
        this.chatToggleBtn.style.borderRadius = '50%';
        this.chatToggleBtn.style.backgroundColor = '#32cd32';
        this.chatToggleBtn.style.display = 'flex';
        this.chatToggleBtn.style.alignItems = 'center';
        this.chatToggleBtn.style.justifyContent = 'center';
        this.chatToggleBtn.style.cursor = 'pointer';
        this.chatToggleBtn.style.zIndex = '10001';
        this.chatToggleBtn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
        this.chatToggleBtn.style.transition = 'transform 0.2s';
        this.chatToggleBtn.style.pointerEvents = 'auto';
        this.chatToggleBtn.innerHTML = '<span style="font-size:24px;">💬</span>';

        // Badge (unread count)
        this.chatBadge = document.createElement('div');
        this.chatBadge.style.position = 'absolute';
        this.chatBadge.style.top = '-4px';
        this.chatBadge.style.right = '-4px';
        this.chatBadge.style.backgroundColor = '#ff4444';
        this.chatBadge.style.color = '#fff';
        this.chatBadge.style.borderRadius = '50%';
        this.chatBadge.style.width = '20px';
        this.chatBadge.style.height = '20px';
        this.chatBadge.style.fontSize = '11px';
        this.chatBadge.style.fontWeight = 'bold';
        this.chatBadge.style.display = 'none';
        this.chatBadge.style.alignItems = 'center';
        this.chatBadge.style.justifyContent = 'center';
        this.chatBadge.style.fontFamily = 'Inter, sans-serif';
        this.chatToggleBtn.appendChild(this.chatBadge);

        this.chatToggleBtn.addEventListener('mouseenter', () => { this.chatToggleBtn.style.transform = 'scale(1.1)'; });
        this.chatToggleBtn.addEventListener('mouseleave', () => { this.chatToggleBtn.style.transform = 'scale(1)'; });
        this.chatToggleBtn.addEventListener('click', () => this.toggleChat());

        // --- Chat Panel (hidden by default) ---
        this.chatContainer = document.createElement('div');
        this.chatContainer.style.position = 'absolute';
        this.chatContainer.style.right = '20px';
        this.chatContainer.style.bottom = '230px';
        this.chatContainer.style.width = '300px';
        this.chatContainer.style.height = '220px';
        this.chatContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
        this.chatContainer.style.borderRadius = '10px';
        this.chatContainer.style.border = '2px solid rgba(50, 205, 50, 0.4)';
        this.chatContainer.style.display = 'none'; // hidden by default
        this.chatContainer.style.flexDirection = 'column';
        this.chatContainer.style.pointerEvents = 'auto';
        this.chatContainer.style.zIndex = '10000';
        this.chatContainer.style.overflow = 'hidden';

        // Chat header with close button
        const chatHeader = document.createElement('div');
        chatHeader.style.display = 'flex';
        chatHeader.style.justifyContent = 'space-between';
        chatHeader.style.alignItems = 'center';
        chatHeader.style.padding = '6px 10px';
        chatHeader.style.backgroundColor = 'rgba(50, 205, 50, 0.2)';
        chatHeader.style.borderBottom = '1px solid rgba(255,255,255,0.1)';

        const chatTitle = document.createElement('span');
        chatTitle.innerText = '💬 Trò chuyện';
        chatTitle.style.color = '#9cff75';
        chatTitle.style.fontWeight = 'bold';
        chatTitle.style.fontSize = '13px';
        chatTitle.style.fontFamily = 'Inter, sans-serif';

        const closeBtn = document.createElement('span');
        closeBtn.innerText = '✕';
        closeBtn.style.color = '#ff6666';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.fontSize = '16px';
        closeBtn.style.fontWeight = 'bold';
        closeBtn.style.padding = '0 4px';
        closeBtn.addEventListener('click', () => this.toggleChat());

        chatHeader.appendChild(chatTitle);
        chatHeader.appendChild(closeBtn);

        // Chat messages area
        this.chatMessagesDiv = document.createElement('div');
        this.chatMessagesDiv.style.flex = '1';
        this.chatMessagesDiv.style.overflowY = 'auto';
        this.chatMessagesDiv.style.padding = '8px';
        this.chatMessagesDiv.style.color = '#ffffff';
        this.chatMessagesDiv.style.fontSize = '12px';
        this.chatMessagesDiv.style.fontFamily = 'Inter, sans-serif';
        this.chatMessagesDiv.style.display = 'flex';
        this.chatMessagesDiv.style.flexDirection = 'column';
        this.chatMessagesDiv.style.gap = '4px';

        // Input area
        const inputWrapper = document.createElement('div');
        inputWrapper.style.display = 'flex';
        inputWrapper.style.borderTop = '1px solid rgba(255,255,255,0.2)';

        this.chatInput = document.createElement('input');
        this.chatInput.type = 'text';
        this.chatInput.placeholder = 'Nhập tin nhắn...';
        this.chatInput.style.flex = '1';
        this.chatInput.style.padding = '8px';
        this.chatInput.style.border = 'none';
        this.chatInput.style.outline = 'none';
        this.chatInput.style.backgroundColor = 'transparent';
        this.chatInput.style.color = '#ffffff';
        this.chatInput.style.fontFamily = 'Inter, sans-serif';
        this.chatInput.style.fontSize = '13px';

        const sendBtn = document.createElement('button');
        sendBtn.innerText = 'GỬI';
        sendBtn.style.padding = '8px 12px';
        sendBtn.style.backgroundColor = '#32cd32';
        sendBtn.style.color = '#fff';
        sendBtn.style.border = 'none';
        sendBtn.style.cursor = 'pointer';
        sendBtn.style.fontWeight = 'bold';
        sendBtn.style.fontFamily = 'Inter, sans-serif';
        sendBtn.style.borderBottomRightRadius = '8px';

        inputWrapper.appendChild(this.chatInput);
        inputWrapper.appendChild(sendBtn);

        this.chatContainer.appendChild(chatHeader);
        this.chatContainer.appendChild(this.chatMessagesDiv);
        this.chatContainer.appendChild(inputWrapper);

        // Append to game container
        const gameContainer = document.getElementById('game-container') || document.body;
        gameContainer.appendChild(this.chatContainer);
        gameContainer.appendChild(this.chatToggleBtn);

        const sendMessage = () => {
            const txt = this.chatInput.value.trim();
            if (txt.length > 0) {
                this.appendChatMessage(this.multiPlayers[this.myIndex].username, txt);
                if (this.roomChannel) {
                    this.roomChannel.send({
                        type: 'broadcast',
                        event: 'chat_msg',
                        payload: { username: this.multiPlayers[this.myIndex].username, message: txt }
                    });
                }
                this.chatInput.value = '';
            }
        };

        sendBtn.addEventListener('click', sendMessage);
        this.chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') sendMessage();
            e.stopPropagation();
        });

        // Clean up DOM elements when scene shuts down
        this.events.on('shutdown', () => {
            if (this.chatContainer && this.chatContainer.parentNode) {
                this.chatContainer.parentNode.removeChild(this.chatContainer);
            }
            if (this.chatToggleBtn && this.chatToggleBtn.parentNode) {
                this.chatToggleBtn.parentNode.removeChild(this.chatToggleBtn);
            }
        });

        this.appendChatMessage('Hệ thống', 'Chào mừng đến với chế độ Nhiều Người Chơi!');
    }

    toggleChat() {
        this.chatOpen = !this.chatOpen;
        if (this.chatOpen) {
            this.chatContainer.style.display = 'flex';
            this.chatToggleBtn.innerHTML = '<span style="font-size:24px;">💬</span>';
            this.chatToggleBtn.appendChild(this.chatBadge);
            this.unreadCount = 0;
            this.chatBadge.style.display = 'none';
            this.chatMessagesDiv.scrollTop = this.chatMessagesDiv.scrollHeight;
            this.chatInput.focus();
        } else {
            this.chatContainer.style.display = 'none';
        }
    }

    appendChatMessage(username, message) {
        if (!this.chatMessagesDiv) return;

        const msgLine = document.createElement('div');
        msgLine.style.wordBreak = 'break-word';

        const nameSpan = document.createElement('span');
        nameSpan.style.fontWeight = 'bold';
        nameSpan.style.color = username === 'Hệ thống' ? '#ffaa00' : '#88ccff';
        nameSpan.innerText = `[${username}]: `;

        const textSpan = document.createElement('span');
        textSpan.innerText = message;

        msgLine.appendChild(nameSpan);
        msgLine.appendChild(textSpan);

        this.chatMessagesDiv.appendChild(msgLine);
        // Giới hạn 50 tin nhắn để tránh DOM phình to trên mobile
        while (this.chatMessagesDiv.childNodes.length > 50) {
            this.chatMessagesDiv.removeChild(this.chatMessagesDiv.firstChild);
        }
        this.chatMessagesDiv.scrollTop = this.chatMessagesDiv.scrollHeight;

        // Show unread badge if chat is closed
        if (!this.chatOpen && this.chatBadge && username !== 'Hệ thống') {
            this.unreadCount++;
            this.chatBadge.innerText = this.unreadCount > 9 ? '9+' : this.unreadCount;
            this.chatBadge.style.display = 'flex';
        }
    }

    createLeaderboardUI() {
        // Simple Leaderboard on the left, below cleanliness
        const lX = 20;
        const lY = 180;

        const bg = this.add.graphics().setScrollFactor(0).setDepth(1000);
        bg.fillStyle(0x000000, 0.5);
        bg.fillRoundedRect(lX, lY, 200, 160, 10);

        this.add.text(lX + 10, lY + 10, '🏆 BẢNG XẾP HẠNG', { font: 'bold 16px Inter', fill: '#ffcc00' }).setScrollFactor(0).setDepth(1001);

        this.leaderboardTexts = [];
        for (let i = 0; i < 4; i++) {
            const txt = this.add.text(lX + 10, lY + 40 + i * 25, '', { font: '14px Inter', fill: '#ffffff' }).setScrollFactor(0).setDepth(1001);
            this.leaderboardTexts.push(txt);
        }
    }

    createMatchSetupMenu() {
        this.matchSetupMenu = this.add.container(0, 0).setDepth(5000).setScrollFactor(0);
        this.matchSetupOverlay = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.9).setInteractive();

        const pw = 500, ph = 350;
        const px = (this.cameras.main.width - pw) / 2;
        const py = (this.cameras.main.height - ph) / 2;

        const bg = this.add.graphics();
        bg.fillStyle(0x1a2a32, 1);
        bg.fillRoundedRect(px, py, pw, ph, 16);
        bg.lineStyle(4, 0x4682b4);
        bg.strokeRoundedRect(px, py, pw, ph, 16);

        this.matchSetupMenu.add([this.matchSetupOverlay, bg]);

        if (this.gameMode === 'multi' && this.myIndex !== 0) {
            // Guest View
            const title = this.add.text(this.cameras.main.width / 2, py + 150, 'ĐANG CHỜ CHỦ PHÒNG\nCHỌN THỜI GIAN...', { font: 'bold 24px Inter', fill: '#4682b4', align: 'center' }).setOrigin(0.5);
            this.matchSetupMenu.add(title);
        } else {
            // Host or Single Player View
            const title = this.add.text(this.cameras.main.width / 2, py + 40, 'CHỌN THỜI GIAN TRẬN ĐẤU', { font: 'bold 24px Inter', fill: '#4682b4' }).setOrigin(0.5);
            this.matchSetupMenu.add(title);

            const durations = [
                { label: '15 Phút', val: 15 * 60 },
                { label: '30 Phút', val: 30 * 60 },
                { label: '60 Phút', val: 60 * 60 },
                { label: '120 Phút', val: 120 * 60 }
            ];

            durations.forEach((d, idx) => {
                const btnBg = this.add.graphics();
                btnBg.fillStyle(0x32cd32, 1);
                const btnX = this.cameras.main.width / 2 - 100;
                const btnY = py + 100 + idx * 55;
                btnBg.fillRoundedRect(btnX, btnY, 200, 40, 8);

                const btnTxt = this.add.text(this.cameras.main.width / 2, btnY + 20, d.label, { font: 'bold 18px Inter', fill: '#ffffff' }).setOrigin(0.5);
                const hitArea = this.add.rectangle(this.cameras.main.width / 2, btnY + 20, 200, 40, 0x0, 0).setInteractive({ useHandCursor: true });

                hitArea.on('pointerdown', () => {
                    if (this.gameMode === 'multi') {
                        // Gửi sự kiện start_match nhiều lần để đảm bảo các Guest (đang load) cũng nhận được
                        for (let i = 0; i < 5; i++) {
                            this.time.delayedCall(i * 1000, () => {
                                if (this.roomChannel) {
                                    this.roomChannel.send({
                                        type: 'broadcast',
                                        event: 'start_match',
                                        payload: { duration: d.val }
                                    });
                                }
                            });
                        }
                    }
                    this.startMatch(d.val);
                });

                this.matchSetupMenu.add([btnBg, btnTxt, hitArea]);
            });
        }
    }

    startMatch(seconds) {
        this.matchDuration = seconds;
        this.matchTimer = seconds;
        this.gameState = 'PLAYING';
        this.matchSetupMenu.setVisible(false);

        // Setup dynamic specialized bots (ONLY in Single Player)
        if (this.gameMode !== 'multi') {
            this.bots = [
                { name: 'Khu 2 (Nga)', score: 0, specialty: 'organic', aggressiveness: 1.2 },
                { name: 'Khu 3 (Tom)', score: 0, specialty: 'plastic', aggressiveness: 1.0 },
                { name: 'Khu 4 (Chen)', score: 0, specialty: 'metal', aggressiveness: 0.9 }
            ];
        }

        this.updateLeaderboard();
        this.updateHUD();
        if (this.music && !this.music.isPlaying) this.music.play();
    }

    updateLeaderboard() {
        if (!this.leaderboardTexts) return;

        const clean = isNaN(this.cleanliness) ? 0 : (this.cleanliness || 0);
        const mon = isNaN(this.money) ? 0 : (this.money || 0);
        const eco = isNaN(this.ecoPoints) ? 0 : (this.ecoPoints || 0);
        const playerScore = clean * 10 + mon * 0.1 + eco * 0.5;

        const safeBots = (this.bots || []).map(b => ({
            ...b,
            score: isNaN(b.score) ? 0 : (b.score || 0)
        }));

        const allPlayers = [
            { name: 'BẠN', score: isNaN(playerScore) ? 0 : playerScore, isPlayer: true },
            ...safeBots
        ];

        allPlayers.sort((a, b) => b.score - a.score);

        const botIcons = { 'organic': '🍌', 'plastic': '🥤', 'metal': '⚙️' };

        allPlayers.forEach((p, idx) => {
            if (idx < 4 && this.leaderboardTexts[idx]) {
                let color = p.isPlayer ? '#00ff00' : '#ffffff';
                let icon = p.isPlayer ? '👤' : (this.gameMode === 'multi' ? '🌐' : (botIcons[p.specialty] || '🤖'));
                const safeScore = Math.floor(isNaN(p.score) ? 0 : p.score);
                this.leaderboardTexts[idx].setText(`${idx + 1}. ${icon} ${p.name}: ${safeScore} điểm`).setFill(color);
            }
        });
    }

    createQuizMenu() {
        this.quizMenu = this.add.container(0, 0).setDepth(4000).setVisible(false).setScrollFactor(0);
        this.quizOverlay = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.8).setInteractive();

        const pw = 600, ph = 400;
        const px = (this.cameras.main.width - pw) / 2;
        const py = (this.cameras.main.height - ph) / 2;

        this.quizBg = this.add.graphics();
        this.quizBg.fillStyle(0xfff8ee, 1);
        this.quizBg.fillRoundedRect(px, py, pw, ph, 16);
        this.quizBg.lineStyle(4, 0xff00ff);
        this.quizBg.strokeRoundedRect(px, py, pw, ph, 16);

        this.quizTitle = this.add.text(this.cameras.main.width / 2, py + 40, 'CÂU HỎI MÔI TRƯỜNG', { font: 'bold 24px Inter', fill: '#ff00ff' }).setOrigin(0.5);
        this.quizQuestion = this.add.text(this.cameras.main.width / 2, py + 100, '', { font: '18px Inter', fill: '#000000', align: 'center', wordWrap: { width: 500 } }).setOrigin(0.5);

        this.quizMenu.add([this.quizOverlay, this.quizBg, this.quizTitle, this.quizQuestion]);

        this.quizOptions = [];
        for (let i = 0; i < 4; i++) {
            const optY = py + 180 + i * 50;
            const btnBg = this.add.graphics();
            const btnText = this.add.text(this.cameras.main.width / 2, optY, '', { font: '16px Inter', fill: '#ffffff' }).setOrigin(0.5);
            const hitArea = this.add.rectangle(this.cameras.main.width / 2, optY, 500, 40, 0x000000, 0).setInteractive({ useHandCursor: true });

            this.quizMenu.add([btnBg, btnText, hitArea]);
            this.quizOptions.push({ bg: btnBg, text: btnText, hitArea: hitArea, y: optY });
        }
    }

    createGuidedTutorial() {
        this.tutorialMenu = this.add.container(0, 0).setDepth(6000).setVisible(false).setScrollFactor(0);

        const pw = 400, ph = 150;
        const px = this.cameras.main.width / 2;
        const py = this.cameras.main.height - 300;

        this.tutorialBg = this.add.graphics();
        this.tutorialBg.fillStyle(0xffffff, 0.85); // Nền trong mờ
        this.tutorialBg.fillRoundedRect(px - pw / 2, py - ph / 2, pw, ph, 16);
        this.tutorialBg.lineStyle(4, 0x4caf50);
        this.tutorialBg.strokeRoundedRect(px - pw / 2, py - ph / 2, pw, ph, 16);

        this.tutorialText = this.add.text(px, py, '', { font: 'bold 18px Inter', fill: '#333', align: 'center', wordWrap: { width: 350 } }).setOrigin(0.5);
        
        const closeBtn = this.add.text(px + pw / 2 - 20, py - ph / 2 + 20, 'X', { font: 'bold 20px Inter', fill: '#ff0000' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        closeBtn.on('pointerdown', () => {
            this.tutorialMenu.setVisible(false);
            this.tutorialCompleted = true;
            this.saveGame();
        });

        this.tutorialMenu.add([this.tutorialBg, this.tutorialText, closeBtn]);
    }

    advanceTutorial() {
        if (this.tutorialCompleted) return;

        const steps = [
            "Chào mừng đến đảo Sinh Thái! Dùng [W A S D] để lái robot.\nHãy click vào bảng MÁY MÓC bên dưới và chọn [Pin Mặt Trời].",
            "Tốt lắm! Giờ hãy click vào một ô đất trống trên lưới để xây dựng nó.",
            "Tuyệt vời! Bạn đã có nguồn thu nhập. Hãy di chuyển robot nhặt cụm rác vừa xuất hiện để nhận thưởng.",
            "Rác được đổi thành Eco Points. Bấm vào nút [NHIỆM VỤ] góc trên bên phải để nhận thưởng khởi đầu nhé!"
        ];

        if (this.tutorialStep < steps.length) {
            this.tutorialText.setText(steps[this.tutorialStep]);
            this.tutorialMenu.setVisible(true);
            this.tutorialMenu.setAlpha(0);
            this.tweens.add({ targets: this.tutorialMenu, alpha: 1, duration: 300 });
            this.tutorialStep++;
        } else {
            this.tutorialMenu.setVisible(false);
            this.tutorialCompleted = true;
            this.showFloatingText(this.cameras.main.width / 2, this.cameras.main.height / 2, 'HOÀN THÀNH HƯỚNG DẪN!', '#00ff00');
            this.saveGame();
        }
    }

    createQuestMenu() {
        this.questMenu = this.add.container(0, 0).setDepth(5000).setVisible(false).setScrollFactor(0);
        this.questOverlay = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, this.cameras.main.width, this.cameras.main.height, 0x000, 0.8).setInteractive();

        const pw = 600, ph = 600;
        const px = this.cameras.main.width / 2;
        const py = this.cameras.main.height / 2;

        const bg = this.add.graphics();
        bg.fillStyle(0xfff8ee, 1);
        bg.fillRoundedRect(px - pw / 2, py - ph / 2, pw, ph, 16);
        bg.lineStyle(4, 0x0088cc);
        bg.strokeRoundedRect(px - pw / 2, py - ph / 2, pw, ph, 16);

        const title = this.add.text(px, py - ph / 2 + 30, '🎯 NHIỆM VỤ', { font: 'bold 24px Inter', fill: '#0088cc' }).setOrigin(0.5);

        const closeBtn = this.add.text(px + pw / 2 - 30, py - ph / 2 + 30, 'X', { font: 'bold 24px Inter', fill: '#ff0000' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        closeBtn.on('pointerdown', () => this.questMenu.setVisible(false));

        this.questMenu.add([this.questOverlay, bg, title, closeBtn]);
        this.questContainer = this.add.container(0, 0);
        this.questMenu.add(this.questContainer);
    }

    openQuestMenu() {
        if (this.tutorialStep === 3) this.advanceTutorial();
        this.questContainer.removeAll(true);
        const px = this.cameras.main.width / 2;
        const py = this.cameras.main.height / 2 - 220;

        this.quests.forEach((q, i) => {
            const rowY = py + i * 65;
            const itemBg = this.add.graphics();
            itemBg.fillStyle(q.completed ? (q.claimed ? 0xdddddd : 0xeeffaa) : 0xffffff, 1);
            itemBg.fillRoundedRect(px - 250, rowY - 30, 500, 60, 8);
            itemBg.lineStyle(2, 0xcccccc);
            itemBg.strokeRoundedRect(px - 250, rowY - 30, 500, 60, 8);

            const txt = this.add.text(px - 230, rowY - 15, q.text, { font: 'bold 16px Inter', fill: '#333' });
            const progTxt = this.add.text(px - 230, rowY + 5, `Tiến độ: ${Math.min(q.progress, q.target)}/${q.target}`, { font: '14px Inter', fill: '#666' });

            let rewardStr = '';
            if (q.rewardM > 0) rewardStr += `+$${q.rewardM} `;
            if (q.rewardE > 0) rewardStr += `+${q.rewardE}🌱`;
            const rewTxt = this.add.text(px, rowY, rewardStr, { font: 'bold 16px Inter', fill: '#0088cc' }).setOrigin(0.5);

            const btnBg = this.add.graphics();
            const btnTxt = this.add.text(px + 180, rowY, '', { font: 'bold 14px Inter', fill: '#fff' }).setOrigin(0.5);

            if (q.claimed) {
                btnBg.fillStyle(0xaaaaaa, 1);
                btnBg.fillRoundedRect(px + 130, rowY - 15, 100, 30, 5);
                btnTxt.setText('Đã nhận');
            } else if (q.completed) {
                btnBg.fillStyle(0xff8c00, 1);
                btnBg.fillRoundedRect(px + 130, rowY - 15, 100, 30, 5);
                btnTxt.setText('NHẬN!');
                const hit = this.add.rectangle(px + 180, rowY, 100, 30, 0x0, 0).setInteractive({ useHandCursor: true });
                hit.on('pointerdown', () => {
                    q.claimed = true;
                    this.money += q.rewardM;
                    this.ecoPoints += q.rewardE;
                    this.sound.play('clean_progress_sfx');
                    this.showFloatingText(px + 180, rowY, 'Nhận thưởng!', '#00ff00');
                    this.updateQuestBadge();
                    this.updateHUD();
                    this.openQuestMenu();
                    this.saveGame();
                });
                this.questContainer.add(hit);
            } else {
                btnBg.fillStyle(0xcccccc, 1);
                btnBg.fillRoundedRect(px + 130, rowY - 15, 100, 30, 5);
                btnTxt.setText('Chưa đạt');
            }
            this.questContainer.add([itemBg, txt, progTxt, rewTxt, btnBg, btnTxt]);
        });

        this.questMenu.setVisible(true);
    }

    setupRandomEvents() {
        if (this.gameMode === 'multi') return;
        this.time.addEvent({
            delay: Phaser.Math.Between(60000, 90000),
            loop: true,
            callback: this.triggerRandomEvent,
            callbackScope: this
        });
    }

    triggerRandomEvent() {
        if (this.gameState !== 'PLAYING') return;
        if (Phaser.Math.Between(1, 100) > 30) return; // 30% chance every 60-90s

        const events = [
            { id: 'sunny', name: 'NẮNG ĐẸP', desc: 'Pin Mặt Trời x2 thu nhập!', color: '#ffcc00', duration: 30000 },
            { id: 'acid_rain', name: 'MƯA AXIT', desc: 'Bão rác đến! Tốc độ xả rác x2!', color: '#ff0000', duration: 30000 },
            { id: 'windy', name: 'GIÓ LỚN', desc: 'Tua-bin gió x3 thu nhập!', color: '#00ffff', duration: 30000 }
        ];

        const ev = Phaser.Utils.Array.GetRandom(events);
        this.currentEvent = ev;
        this.showEventBanner(ev);

        this.time.delayedCall(ev.duration, () => {
            this.currentEvent = null;
            this.showFloatingText(this.cameras.main.width / 2, 100, `Hết sự kiện: ${ev.name}`, '#ffffff');
        });
    }

    showEventBanner(ev) {
        const px = this.cameras.main.width / 2;
        const banner = this.add.container(px, -50).setDepth(8000).setScrollFactor(0);
        const bg = this.add.graphics();
        bg.fillStyle(0x000000, 0.8);
        bg.fillRoundedRect(-200, 0, 400, 60, 10);
        bg.lineStyle(2, Phaser.Display.Color.HexStringToColor(ev.color).color);
        bg.strokeRoundedRect(-200, 0, 400, 60, 10);

        const title = this.add.text(0, 15, `SỰ KIỆN: ${ev.name}`, { font: 'bold 16px Inter', fill: ev.color }).setOrigin(0.5);
        const desc = this.add.text(0, 40, ev.desc, { font: '14px Inter', fill: '#ffffff' }).setOrigin(0.5);

        banner.add([bg, title, desc]);
        this.sound.play('build_sfx');

        this.tweens.add({ targets: banner, y: 80, duration: 500, ease: 'Bounce.Out' });
        this.tweens.add({ targets: banner, alpha: 0, delay: 5000, duration: 1000, onComplete: () => banner.destroy() });
    }

    createProfessorUI() {
        this.profMenu = this.add.container(0, 0).setDepth(6000).setVisible(false).setScrollFactor(0);

        const px = this.cameras.main.width / 2;
        const py = this.cameras.main.height - 120; // Bottom center

        this.profBg = this.add.graphics();
        this.profBg.fillStyle(0x1a2a32, 0.95);
        this.profBg.fillRoundedRect(px - 350, py - 60, 700, 120, 16);
        this.profBg.lineStyle(4, 0x4caf50);
        this.profBg.strokeRoundedRect(px - 350, py - 60, 700, 120, 16);

        this.profAvatar = this.add.image(px - 280, py, 'prof_eco').setScale(0.15); // Adjust scale based on generated image size

        this.profName = this.add.text(px - 200, py - 40, 'GIÁO SƯ ECO', { font: 'bold 20px Inter', fill: '#8effa8' });
        this.profText = this.add.text(px - 200, py - 10, '...', { font: '16px Inter', fill: '#ffffff', wordWrap: { width: 500 } });

        const closeBtn = this.add.graphics();
        closeBtn.fillStyle(0x4caf50, 1);
        closeBtn.fillRoundedRect(px + 230, py + 15, 100, 35, 8);
        const closeTxt = this.add.text(px + 280, py + 32, 'TUYỆT QUÁ!', { font: 'bold 14px Inter', fill: '#ffffff' }).setOrigin(0.5);

        const hitArea = this.add.rectangle(px + 280, py + 32, 100, 35, 0x0, 0).setInteractive({ useHandCursor: true });
        hitArea.on('pointerdown', () => {
            this.sound.play('build_sfx');
            this.tweens.add({
                targets: this.profMenu,
                alpha: 0,
                y: 50,
                duration: 300,
                onComplete: () => this.profMenu.setVisible(false)
            });
            if (this.profRewardAction) {
                this.profRewardAction();
                this.profRewardAction = null;
            }
        });

        this.profMenu.add([this.profBg, this.profAvatar, this.profName, this.profText, closeBtn, closeTxt, hitArea]);
    }

    triggerProfessorEvent(percentage) {
        if (this.gameMode === 'multi') return;

        let msg = '';
        let reward = { m: 0, e: 0 };

        if (percentage === 25) {
            msg = 'Thật tuyệt vời! Không khí đã trong lành hơn một chút. Vài chú chim đã quay lại đảo rồi đấy! Hãy tiếp tục phát huy nhé!';
            reward = { m: 300, e: 100 };
        } else if (percentage === 50) {
            msg = 'Đảo của chúng ta đang xanh lên từng ngày! Tôi vừa thấy đàn thỏ tung tăng trên cỏ. Tôi có một món quà nhỏ cho dự án của bạn!';
            reward = { m: 500, e: 200 };
        } else if (percentage === 75) {
            msg = 'Tuyệt tác! Hệ sinh thái đã phục hồi 75%. Những chú hươu rừng đã về đây trú ngụ. Cố gắng lên, sắp đến đích rồi!';
            reward = { m: 1000, e: 500 };
        } else if (percentage === 100) {
            msg = 'KỲ TÍCH! 100% Đảo đã XANH. Hệ sinh thái đã hoàn toàn phục hồi. Xin cảm ơn sự cống hiến vĩ đại của bạn cho hành tinh này!';
            reward = { m: 5000, e: 1000 };
        }

        this.sound.play('build_sfx'); // Can use another sfx if available
        this.profText.setText(msg);

        this.profRewardAction = () => {
            if (reward.m > 0 || reward.e > 0) {
                this.money += reward.m;
                this.ecoPoints += reward.e;
                this.showFloatingText(this.cameras.main.width / 2, this.cameras.main.height / 2, `+$${reward.m} | +${reward.e}🌱`, '#00ff00');
                this.updateHUD();

                if (percentage === 100) {
                    // Unlock next map
                    const currentIdx = MAP_THEMES.findIndex(t => t.id === this.mapTheme);
                    if (currentIdx !== -1 && currentIdx < MAP_THEMES.length - 1) {
                        const nextTheme = MAP_THEMES[currentIdx + 1];
                        let unlockedMaps = ['tropical'];
                        try {
                            const uid = localStorage.getItem('eco_userid') || 'guest';
                            const saved = localStorage.getItem(`eco_unlocked_maps_${uid}`);
                            if (saved) unlockedMaps = JSON.parse(saved);
                        } catch (e) {}
                        
                        if (!unlockedMaps.includes(nextTheme.id)) {
                            unlockedMaps.push(nextTheme.id);
                            localStorage.setItem(`eco_unlocked_maps_${uid}`, JSON.stringify(unlockedMaps));
                            setTimeout(() => {
                                this.showFloatingText(this.cameras.main.width / 2, this.cameras.main.height / 2 + 50, `ĐÃ MỞ KHÓA: ${nextTheme.name.toUpperCase()}!`, '#ffff00');
                            }, 2000);
                        }
                    }

                    this.showPrestigeMenu();
                }
            }
        };

        this.profMenu.setAlpha(0);
        this.profMenu.setY(50);
        this.profMenu.setVisible(true);
        this.tweens.add({ targets: this.profMenu, alpha: 1, y: 0, duration: 400, ease: 'Back.Out' });
    }

    spawnWildlife(emoji, count) {
        let greenCells = [];
        for (let x = 1; x < CONFIG.GRID_SIZE - 1; x++) {
            for (let y = 1; y < CONFIG.GRID_SIZE - 1; y++) {
                const cell = this.grid[x][y];
                if (cell.isBuildable && !cell.building && !cell.hasTrash) {
                    greenCells.push(cell);
                }
            }
        }

        for (let i = 0; i < count; i++) {
            if (greenCells.length === 0) break;
            const rIdx = Phaser.Math.Between(0, greenCells.length - 1);
            const cell = greenCells[rIdx];
            greenCells.splice(rIdx, 1);

            const animal = this.add.text(cell.posX, cell.posY - 10, emoji, { font: '20px Arial' }).setOrigin(0.5);
            animal.setDepth(this.getDepthForCell(cell, 3));

            // Random movement tween
            this.tweens.add({
                targets: animal,
                x: animal.x + Phaser.Math.Between(-20, 20),
                y: animal.y + Phaser.Math.Between(-10, 10),
                duration: 2000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.InOut'
            });
        }
    }

    showPrestigeMenu() {
        this.gameState = 'ENDED';
        this.prestigeMenu = this.add.container(0, 0).setDepth(7000).setScrollFactor(0);

        const px = this.cameras.main.width / 2;
        const py = this.cameras.main.height / 2;

        const overlay = this.add.rectangle(px, py, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.8).setInteractive();
        const bg = this.add.graphics();
        bg.fillStyle(0x1a2a32, 1);
        bg.fillRoundedRect(px - 250, py - 150, 500, 300, 16);
        bg.lineStyle(4, 0x00ffff);
        bg.strokeRoundedRect(px - 250, py - 150, 500, 300, 16);

        const title = this.add.text(px, py - 100, 'KỲ TÍCH KHÔI PHỤC!', { font: 'bold 30px Inter', fill: '#00ffff' }).setOrigin(0.5);
        const desc = this.add.text(px, py - 40, 'Bạn đã cứu sống hòn đảo này.\nBây giờ bạn có thể ở lại tiếp tục xây dựng\nHoặc "Chuyển Sinh" để cứu một hòn đảo khác khó khăn hơn.', { font: '16px Inter', fill: '#ffffff', align: 'center' }).setOrigin(0.5);

        const stayBtn = this.add.graphics();
        stayBtn.fillStyle(0x4caf50, 1);
        stayBtn.fillRoundedRect(px - 180, py + 40, 150, 40, 8);
        const stayTxt = this.add.text(px - 105, py + 60, 'Ở LẠI ĐẢO', { font: 'bold 16px Inter', fill: '#ffffff' }).setOrigin(0.5);
        const stayHit = this.add.rectangle(px - 105, py + 60, 150, 40, 0x0, 0).setInteractive({ useHandCursor: true });

        stayHit.on('pointerdown', () => {
            this.gameState = 'PLAYING';
            this.prestigeMenu.destroy();
        });

        const prestigeBtn = this.add.graphics();
        prestigeBtn.fillStyle(0xffa500, 1);
        prestigeBtn.fillRoundedRect(px + 30, py + 40, 150, 40, 8);
        const prestigeTxt = this.add.text(px + 105, py + 60, 'CHUYỂN SINH', { font: 'bold 16px Inter', fill: '#ffffff' }).setOrigin(0.5);
        const prestigeHit = this.add.rectangle(px + 105, py + 60, 150, 40, 0x0, 0).setInteractive({ useHandCursor: true });

        prestigeHit.on('pointerdown', () => {
            this.prestigePoints += 1;
            this.cleanliness = 0;
            this.money = 200;
            this.ecoPoints = 100;
            this.profEcoTriggered = { '25': false, '50': false, '75': false, '100': false };
            this.quests.forEach(q => { q.progress = 0; q.completed = false; q.claimed = false; });

            // Xóa hết nhà
            this.buildings.forEach(b => {
                if (b.getData('cell')) b.getData('cell').building = null;
                b.destroy();
            });
            this.buildings = [];
            this.saveGame();

            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.restart();
            });
        });

        this.prestigeMenu.add([overlay, bg, title, desc, stayBtn, stayTxt, stayHit, prestigeBtn, prestigeTxt, prestigeHit]);
    }

    updateQuestProgress(questId, amount = 1) {
        if (this.gameMode === 'multi') return;
        const q = this.quests.find(x => x.id === questId);
        if (q && !q.completed) {
            q.progress += amount;
            if (q.progress >= q.target) {
                q.progress = q.target;
                q.completed = true;
                this.updateQuestBadge();
            }
        }
    }

    updateQuestBadge() {
        const claimable = this.quests.filter(q => q.completed && !q.claimed).length;
        if (claimable > 0) {
            this.questBadgeBg.setVisible(true);
            this.questBadgeText.setVisible(true);
            this.questBadgeText.setText(claimable.toString());
        } else {
            this.questBadgeBg.setVisible(false);
            this.questBadgeText.setVisible(false);
        }
    }

    saveGame() {
        if (this.gameMode !== 'single' || this.gameState !== 'PLAYING') return;
        try {
            const saveData = {
                cleanliness: this.cleanliness,
                money: this.money,
                ecoPoints: this.ecoPoints,
                playerSpeedLevel: this.playerSpeedLevel,
                playerCapLevel: this.playerCapLevel,
                unlockedTechs: this.unlockedTechs,
                quests: this.quests,
                tutorialStep: this.tutorialStep,
                tutorialCompleted: this.tutorialCompleted,
                profEcoTriggered: this.profEcoTriggered,
                prestigePoints: this.prestigePoints,
                buildings: this.buildings.map(b => {
                    const cell = b.getData('cell');
                    return {
                        gridX: cell ? cell.x : -1,
                        gridY: cell ? cell.y : -1,
                        key: b.getData('key'),
                        level: b.getData('level')
                    };
                }).filter(b => b.gridX !== -1)
            };
            const uid = localStorage.getItem('eco_userid') || 'guest';
            localStorage.setItem(`eco_save_data_${uid}`, JSON.stringify(saveData));
        } catch (e) {
            console.error('Error saving game:', e);
        }
    }

    loadGame() {
        if (this.gameMode !== 'single') return;
        const uid = localStorage.getItem('eco_userid') || 'guest';
        const saved = localStorage.getItem(`eco_save_data_${uid}`);
        if (!saved) return;

        try {
            const data = JSON.parse(saved);
            this.cleanliness = data.cleanliness || 0;
            this.money = data.money || CONFIG.START_MONEY;
            this.ecoPoints = data.ecoPoints || CONFIG.START_ECO_POINTS;
            this.playerSpeedLevel = data.playerSpeedLevel || 1;
            this.playerCapLevel = data.playerCapLevel || 1;
            this.playerSpeed = ROBOT_UPGRADES[0].levels[this.playerSpeedLevel - 1];
            this.playerCap = ROBOT_UPGRADES[1].levels[this.playerCapLevel - 1];
            this.unlockedTechs = data.unlockedTechs || [];
            this.tutorialStep = data.tutorialStep || 0;
            this.tutorialCompleted = data.tutorialCompleted || false;

            if (data.quests) {
                // Merge loaded quests with current quest templates to maintain rewards/texts
                data.quests.forEach(sq => {
                    const q = this.quests.find(x => x.id === sq.id);
                    if (q) {
                        q.progress = sq.progress;
                        q.completed = sq.completed;
                        q.claimed = sq.claimed;
                    }
                });
                this.updateQuestBadge();
            }

            if (data.profEcoTriggered) {
                this.profEcoTriggered = data.profEcoTriggered;
            }
            if (data.prestigePoints !== undefined) {
                this.prestigePoints = data.prestigePoints;
            }

            if (data.buildings) {
                data.buildings.forEach(bData => {
                    const cell = this.grid[bData.gridX][bData.gridY];
                    if (cell) {
                        const type = BUILDING_TYPES.find(t => t.key === bData.key) || DECOR_TYPES.find(t => t.key === bData.key);
                        if (type) {
                            // Instantiate building using similar logic to handleCellClick
                            const isDecor = DECOR_TYPES.includes(type);
                            const newBuilding = this.add.image(cell.posX, cell.posY - 10, type.key).setDepth(2000);
                            newBuilding.setScale(type.key.includes('tree') ? 0.12 : 0.1);

                            newBuilding.setInteractive({ useHandCursor: true });
                            newBuilding.on('pointerdown', () => {
                                if (!isDecor && newBuilding.getData('ownerIndex') === this.myIndex) {
                                    this.selectBuilding(newBuilding);
                                }
                            });

                            newBuilding.setData({
                                key: type.key,
                                cell: cell,
                                isDecor: isDecor,
                                ownerIndex: this.myIndex
                            });

                            if (!isDecor) {
                                const level = bData.level || 1;
                                const baseCleanRate = type.cleanRate || 0;
                                const baseIncomeRate = type.incomeRate || 0;
                                const baseEcoRate = type.ecoRate || 0;

                                newBuilding.setData({
                                    level: level,
                                    name: type.name,
                                    baseCleanRate: baseCleanRate,
                                    baseIncomeRate: baseIncomeRate,
                                    baseEcoRate: baseEcoRate,
                                    cleanRate: baseCleanRate * (1 + CONFIG.UPGRADE_OUTPUT_MULTIPLIER * (level - 1)),
                                    incomeRate: baseIncomeRate * (1 + CONFIG.UPGRADE_OUTPUT_MULTIPLIER * (level - 1)),
                                    ecoRate: baseEcoRate * (1 + CONFIG.UPGRADE_OUTPUT_MULTIPLIER * (level - 1)),
                                    isProcessor: type.isProcessor || false,
                                    processType: type.processType || null,
                                    maxKey: type.maxKey || null
                                });
                                newBuilding.setScale(0.1 + (level - 1) * 0.015);
                            }

                            cell.building = newBuilding;
                            cell.ownerIndex = this.myIndex;
                            this.buildings.push(newBuilding);
                            this.buildingGroup.add(newBuilding);
                            this.sortDepths();
                        }
                    }
                });
            }

            this.checkRobotEvolution();
            this.updateHUD();
            this.updateMask();
        } catch (e) {
            console.error("Lỗi khi load save data", e);
        }
    }

    showQuiz() {
        const qData = QUIZ_QUESTIONS[Math.floor(Math.random() * QUIZ_QUESTIONS.length)];
        this.quizQuestion.setText(qData.q);

        this.quizOptions.forEach((opt, idx) => {
            if (idx < qData.options.length) {
                opt.text.setText(qData.options[idx]);
                opt.bg.clear();
                opt.bg.fillStyle(0x4682b4, 1);
                opt.bg.fillRoundedRect(this.cameras.main.width / 2 - 250, opt.y - 20, 500, 40, 8);

                opt.hitArea.setVisible(true);
                opt.hitArea.removeAllListeners('pointerdown');
                opt.hitArea.on('pointerdown', () => this.answerQuiz(idx === qData.ans));
            } else {
                opt.hitArea.setVisible(false);
                opt.bg.clear();
                opt.text.setText('');
            }
        });

        this.quizMenu.setVisible(true);
    }

    answerQuiz(isCorrect) {
        this.quizMenu.setVisible(false);
        if (isCorrect) {
            this.sound.play('clean_progress_sfx');
            this.money += 150;
            this.ecoPoints += 50;

            const floatText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'CHÍNH XÁC!\n+$150 | +50🌱', { font: 'bold 32px Inter', fill: '#00ff00', align: 'center', stroke: '#000000', strokeThickness: 6 }).setOrigin(0.5).setDepth(5000);
            this.tweens.add({ targets: floatText, y: floatText.y - 100, alpha: 0, duration: 2000, onComplete: () => floatText.destroy() });
        } else {
            const floatText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'SAI RỒI!', { font: 'bold 32px Inter', fill: '#ff0000', stroke: '#000000', strokeThickness: 6 }).setOrigin(0.5).setDepth(5000);
            this.tweens.add({ targets: floatText, y: floatText.y - 50, alpha: 0, duration: 1500, onComplete: () => floatText.destroy() });
        }
        this.updateHUD();
    }

    createResearchMenu() {
        this.researchMenu = this.add.container(0, 0).setDepth(3000).setVisible(false).setScrollFactor(0);

        this.researchOverlay = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.8)
            .setInteractive();

        const panelWidth = 600;
        const panelHeight = 400;
        const panelX = (this.cameras.main.width - panelWidth) / 2;
        const panelY = (this.cameras.main.height - panelHeight) / 2;

        this.researchBg = this.add.graphics();
        this.researchBg.fillStyle(0xfff8ee, 1);
        this.researchBg.fillRoundedRect(panelX, panelY, panelWidth, panelHeight, 16);
        this.researchBg.lineStyle(4, 0x8b5a2b);
        this.researchBg.strokeRoundedRect(panelX, panelY, panelWidth, panelHeight, 16);

        const title = this.add.text(this.cameras.main.width / 2, panelY + 30, 'CÂY CÔNG NGHỆ', {
            font: 'bold 24px Inter',
            fill: '#8b4513'
        }).setOrigin(0.5);

        const closeBtn = this.add.text(panelX + panelWidth - 30, panelY + 30, 'X', {
            font: 'bold 24px Inter', fill: '#ff0000'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        closeBtn.on('pointerdown', () => {
            this.researchMenu.setVisible(false);
        });

        this.researchNodes = [];
        this.researchMenu.add([this.researchOverlay, this.researchBg, title, closeBtn]);
    }

    openResearchMenu() {
        // Clear old nodes
        this.researchNodes.forEach(n => n.destroy());
        this.researchNodes = [];

        const panelY = (this.cameras.main.height - 400) / 2;
        const centerX = this.cameras.main.width / 2;

        let startY = panelY + 100;

        TECH_TREE.forEach((tech, index) => {
            const isUnlocked = this.unlockedTechs.includes(tech.id);
            const isAvailable = !isUnlocked && (!tech.req || this.unlockedTechs.includes(tech.req));

            const nodeContainer = this.add.container(centerX, startY + index * 90);

            const nodeBg = this.add.graphics();
            const color = isUnlocked ? 0x32cd32 : (isAvailable ? 0xffcc00 : 0xaaaaaa);
            nodeBg.fillStyle(color, 1);
            nodeBg.fillRoundedRect(-200, -35, 400, 70, 8);
            nodeBg.lineStyle(3, 0x000000);
            nodeBg.strokeRoundedRect(-200, -35, 400, 70, 8);

            const icon = isUnlocked ? '✅ ' : (isAvailable ? '🔓 ' : '🔒 ');
            const nameTxt = this.add.text(-180, -20, `${icon}${tech.name}`, { font: 'bold 16px Inter', fill: '#000' });
            const descTxt = this.add.text(-180, 5, tech.desc, { font: '12px Inter', fill: '#333' });

            const costTxt = this.add.text(180, 0, isUnlocked ? 'Đã mở khóa' : `${tech.costEco} 🌱`, {
                font: 'bold 16px Inter', fill: isUnlocked ? '#006400' : '#b22222'
            }).setOrigin(1, 0.5);

            const hitArea = this.add.rectangle(0, 0, 400, 70, 0x000, 0);

            if (isAvailable) {
                hitArea.setInteractive({ useHandCursor: true });
                hitArea.on('pointerdown', () => this.unlockTech(tech.id, tech.costEco));
            }

            nodeContainer.add([nodeBg, nameTxt, descTxt, costTxt, hitArea]);
            this.researchNodes.push(nodeContainer);
            this.researchMenu.add(nodeContainer);

            // Draw connecting line if there's a req
            if (index > 0) {
                const line = this.add.graphics();
                line.lineStyle(4, 0x8b5a2b, 0.5);
                line.lineBetween(centerX, startY + (index - 1) * 90 + 35, centerX, startY + index * 90 - 35);
                this.researchNodes.push(line);
                this.researchMenu.add(line);
                this.researchMenu.sendToBack(line);
                this.researchMenu.sendToBack(this.researchOverlay);
                this.researchMenu.sendToBack(this.researchBg);
            }
        });

        this.researchMenu.setVisible(true);
    }

    unlockTech(techId, cost) {
        if (this.ecoPoints >= cost) {
            this.ecoPoints -= cost;
            this.unlockedTechs.push(techId);
            this.sound.play('clean_progress_sfx');

            // Pop floating text to show deduction visually
            const floatText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, `-${cost}🌱 UNLOCKED!`, {
                font: 'bold 24px Inter',
                fill: '#ff4444',
                stroke: '#ffffff',
                strokeThickness: 4
            }).setOrigin(0.5).setDepth(4000);

            this.tweens.add({
                targets: floatText,
                y: floatText.y - 100,
                alpha: 0,
                duration: 1500,
                ease: 'Cubic.Out',
                onComplete: () => floatText.destroy()
            });

            this.updateHUD();
            this.refreshMenu();
            this.openResearchMenu(); // redraw
        } else {
            // Not enough points visual feedback
            const floatText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 100, 'Không đủ Eco Points!', {
                font: 'bold 20px Inter',
                fill: '#ff0000',
                stroke: '#000000',
                strokeThickness: 4
            }).setOrigin(0.5).setDepth(4000);

            this.tweens.add({
                targets: floatText,
                y: floatText.y - 30,
                alpha: 0,
                duration: 1000,
                ease: 'Cubic.Out',
                onComplete: () => floatText.destroy()
            });
        }
    }

    createSpeechBubble() {
        this.speechBubble = this.add.container(0, 0).setDepth(2000).setVisible(false);

        // Bubble Background
        const bg = this.add.graphics();
        bg.fillStyle(0xfff8ee, 1);
        bg.fillRoundedRect(-100, -140, 200, 130, 15);
        bg.lineStyle(4, 0x8b5a2b);
        bg.strokeRoundedRect(-100, -140, 200, 130, 15);

        // Tail
        bg.fillStyle(0xfff8ee, 1);
        bg.fillTriangle(-20, -10, 0, -15, -20, -30);
        bg.lineStyle(4, 0x8b5a2b);
        bg.lineBetween(-20, -10, 0, -15);
        bg.lineBetween(-20, -10, -20, -30);

        // Texts
        this.bubbleTitle = this.add.text(-90, -130, 'NAME', { font: 'bold 16px Inter', fill: '#8b4513' });
        this.bubbleLevel = this.add.text(90, -130, 'Lv.1', { font: 'bold 16px Inter', fill: '#000000' }).setOrigin(1, 0);
        this.bubbleEff = this.add.text(-90, -105, 'Hiệu quả hiện tại:', { font: '12px Inter', fill: '#555555' });
        this.bubbleEffVal = this.add.text(90, -105, '10 🌱', { font: 'bold 12px Inter', fill: '#2e8b57' }).setOrigin(1, 0);
        this.bubbleNextLv = this.add.text(0, -85, 'LV.2 SẮP TỚI', { font: 'bold 12px Inter', fill: '#8b4513' }).setOrigin(0.5);

        // Button
        const btnBg = this.add.graphics();
        btnBg.fillStyle(0x7cfc00, 1);
        btnBg.fillRoundedRect(-60, -70, 120, 30, 15);
        btnBg.lineStyle(2, 0x006400);
        btnBg.strokeRoundedRect(-60, -70, 120, 30, 15);

        const btnHitArea = this.add.rectangle(0, -55, 120, 30, 0x000000, 0).setInteractive({ useHandCursor: true });
        this.bubbleBtnText = this.add.text(0, -55, 'NÂNG CẤP', { font: 'bold 16px Inter', fill: '#ffffff', stroke: '#006400', strokeThickness: 3 }).setOrigin(0.5);

        btnHitArea.on('pointerover', () => { btnBg.setScale(1.05); this.bubbleBtnText.setScale(1.05); });
        btnHitArea.on('pointerout', () => { btnBg.setScale(1); this.bubbleBtnText.setScale(1); });
        btnHitArea.on('pointerdown', (pointer) => {
            pointer.event.stopPropagation();
            if (this.selectedBuilding) this.upgradeBuilding(this.selectedBuilding);
        });

        this.bubbleReq = this.add.text(0, -25, 'Yêu cầu: 50 🌱', { font: 'bold 12px Inter', fill: '#b22222' }).setOrigin(0.5);

        this.speechBubble.add([bg, this.bubbleTitle, this.bubbleLevel, this.bubbleEff, this.bubbleEffVal, this.bubbleNextLv, btnBg, this.bubbleBtnText, btnHitArea, this.bubbleReq]);
    }

    hideSpeechBubble() {
        if (this.speechBubble) this.speechBubble.setVisible(false);
    }

    updateSelectionHUD() {
        if (!this.selectedBuilding) {
            this.hideSpeechBubble();
            return;
        }

        const level = this.selectedBuilding.getData('level');
        const name = this.selectedBuilding.getData('name');
        const cleanRate = this.selectedBuilding.getData('cleanRate');
        const ecoRate = this.selectedBuilding.getData('ecoRate');
        const upgradeCost = this.getUpgradeCost(this.selectedBuilding);

        this.bubbleTitle.setText(name.toUpperCase());
        this.bubbleLevel.setText(`Lv.${level}`);
        this.bubbleEffVal.setText(`${(cleanRate * 10).toFixed(1)} 🌱`);

        if (level >= CONFIG.MAX_BUILDING_LEVEL) {
            this.bubbleNextLv.setText('ĐÃ ĐẠT CẤP TỐI ĐA');
            this.bubbleReq.setText('');
            this.bubbleBtnText.setText('MAX');
        } else {
            this.bubbleNextLv.setText(`LV.${level + 1} SẮP TỚI`);
            this.bubbleReq.setText(`Yêu cầu: ${upgradeCost} 🌱`);
            this.bubbleBtnText.setText('NÂNG CẤP');
        }

        this.speechBubble.setPosition(this.selectedBuilding.x + 80, this.selectedBuilding.y - 30);
        this.speechBubble.setVisible(true);
    }

    getUpgradeCost(building) {
        const level = building.getData('level');
        const baseCost = building.getData('baseEcoRate') * 25 + 25;
        return Math.ceil(baseCost * Math.pow(CONFIG.UPGRADE_COST_MULTIPLIER, level - 1));
    }

    selectBuilding(building) {
        this.selectedBuilding = building;
        this.selectedBuildingType = null;
        this.updateSelectionHUD();
    }

    upgradeBuilding(building) {
        const level = building.getData('level');
        if (level >= CONFIG.MAX_BUILDING_LEVEL) return;

        const cost = this.getUpgradeCost(building);
        if (this.ecoPoints < cost) {
            this.showToast('Không đủ Eco Points!');
            return;
        }

        this.ecoPoints -= cost;

        // Visual feedback for deduction
        this.showFloatingText(building.x, building.y - 40, `-${cost}🌱`, '#ff0000');

        const newLevel = level + 1;
        const baseCleanRate = building.getData('baseCleanRate');
        const baseIncomeRate = building.getData('baseIncomeRate');
        const baseEcoRate = building.getData('baseEcoRate');

        const newCleanRate = baseCleanRate * (1 + CONFIG.UPGRADE_OUTPUT_MULTIPLIER * (newLevel - 1));
        const newIncomeRate = baseIncomeRate * (1 + CONFIG.UPGRADE_OUTPUT_MULTIPLIER * (newLevel - 1));
        const newEcoRate = baseEcoRate * (1 + CONFIG.UPGRADE_OUTPUT_MULTIPLIER * (newLevel - 1));

        building.setData({ level: newLevel, cleanRate: newCleanRate, incomeRate: newIncomeRate, ecoRate: newEcoRate });
        building.setScale(0.1 + (newLevel - 1) * 0.015);
        this.sound.play('build_sfx');

        // Evolution logic for multi-stage visuals
        const currentKey = building.getData('key');
        if (newLevel === 2) {
            if (currentKey === 'organic_composter_l1') building.setTexture('organic_composter_l2');
            if (currentKey === 'plastic_recycler_l1') building.setTexture('plastic_recycler_l2');
            if (currentKey === 'metal_recycler_l1') building.setTexture('metal_recycler_l2');
            if (currentKey === 'circuit_recycler_l1') building.setTexture('circuit_recycler_l2');
        } else if (newLevel === 3) {
            if (currentKey === 'organic_composter_l1') building.setTexture('organic_composter_l3');
            if (currentKey === 'plastic_recycler_l1') building.setTexture('plastic_recycler_l3');
            if (currentKey === 'metal_recycler_l1') building.setTexture('metal_recycler_l3');
            if (currentKey === 'circuit_recycler_l1') building.setTexture('circuit_recycler_l3');
        }

        // Evolve into the advanced eco-tech visual once it hits max level
        const maxKey = building.getData('maxKey');
        if (newLevel >= CONFIG.MAX_BUILDING_LEVEL && maxKey && !building.getData('isEvolved')) {
            building.setData('isEvolved', true);
            this.tweens.add({
                targets: building,
                scale: 0,
                duration: 250,
                ease: 'Cubic.In',
                onComplete: () => {
                    building.setTexture(maxKey);
                    this.tweens.add({
                        targets: building,
                        scale: 0.1 + (newLevel - 1) * 0.015,
                        duration: 350,
                        ease: 'Back.Out'
                    });
                    this.dustEmitter.explode(20, building.x, building.y);
                    this.showFloatingText(building.x, building.y - 40, '✨ NÂNG CẤP TỐI ĐA!', '#00ffcc');
                }
            });
        }

        window.ProgressLogger.logProgress('building_upgraded', {
            type: building.getData('key'),
            level: newLevel
        });

        this.updateHUD();
        this.updateSelectionHUD();
    }

    update(time, delta) {
        if (this.gameState !== 'PLAYING') return;
        if (this.exitMenu && this.exitMenu.visible) return; // Fully paused while the pause menu is open

        this.updatePlacementPreview();

        // Interpolate network players via lerp (thay thế tween để tránh memory leak)
        if (this.gameMode === 'multi' && this.networkPlayers) {
            const lerpFactor = Math.min(1, delta / 150);
            for (let i = 0; i < 3; i++) {
                if (i === this.myIndex || !this.networkPlayers[i]) continue;
                const np = this.networkPlayers[i];
                if (np.targetX !== undefined) {
                    np.sprite.x += (np.targetX - np.sprite.x) * lerpFactor;
                    np.sprite.y += (np.targetY - np.sprite.y) * lerpFactor;
                    np.text.x += (np.targetX - np.text.x) * lerpFactor;
                    np.text.y += (np.targetY - 40 - np.text.y) * lerpFactor;
                    np.sprite.flipX = np.targetFlipX;
                    np.sprite.setDepth(np.targetDepth);
                    np.heldTrashIcons.forEach((icon, j) => {
                        icon.x += (np.targetX - icon.x) * lerpFactor;
                        icon.y += (np.targetY - 50 - j * 20 - icon.y) * lerpFactor;
                        icon.setDepth(np.targetDepth + 1);
                    });
                }
            }
        }

        let totalRate = 0;
        let totalIncomeRate = 0;
        let totalEcoRate = 0;
        const myOwnerIdx = this.gameMode === 'multi' ? this.myIndex : 0;
        this.buildings.forEach(b => {
            const owner = b.getData('ownerIndex');
            if (owner === undefined || owner === myOwnerIdx) {
                totalRate += b.getData('cleanRate') || 0;

                let bIncome = b.getData('incomeRate') || 0;
                if (this.currentEvent) {
                    if (this.currentEvent.id === 'sunny' && b.getData('key') === 'solar_panel') bIncome *= 2;
                    if (this.currentEvent.id === 'windy' && b.getData('key') === 'wind_turbine') bIncome *= 3;
                }
                totalIncomeRate += bIncome;

                totalEcoRate += b.getData('ecoRate') || 0;
            }
        });

        // Player Logic (disabled while the trash-catching minigame or any overlay menu is open)
        if (this.player && this.gameState === 'PLAYING' && !this.minigameMenu.visible && !this.isOverlayOpen()) {
            const speed = this.playerSpeed * (delta / 1000);
            let vx = 0;
            let vy = 0;
            let isJoystick = false;

            if (this.cursors.left.isDown || this.wasd.A.isDown) vx -= 1;
            if (this.cursors.right.isDown || this.wasd.D.isDown) vx += 1;
            if (this.cursors.up.isDown || this.wasd.W.isDown) vy -= 1;
            if (this.cursors.down.isDown || this.wasd.S.isDown) vy += 1;

            if (this.joystickVector.x !== 0 || this.joystickVector.y !== 0) {
                vx = this.joystickVector.x;
                vy = this.joystickVector.y;
                isJoystick = true;
            }

            if (vx !== 0 || vy !== 0) {
                const length = Math.sqrt(vx * vx + vy * vy);
                let moveX = vx;
                let moveY = vy;

                if (isJoystick) {
                    // Giữ nguyên độ lớn của vector để điều khiển analog chính xác hơn
                    // Giảm tốc độ tối đa của joystick xuống để thật hơn
                    const joystickSpeedMultiplier = 0.6;
                    moveX *= joystickSpeedMultiplier;
                    moveY *= joystickSpeedMultiplier;
                } else if (length > 1) {
                    // Chuẩn hóa vector cho bàn phím khi đi chéo
                    moveX /= length;
                    moveY /= length;
                }

                this.player.x += moveX * speed;
                this.player.y += moveY * speed;
                this.player.flipX = moveX < 0;
            }

            const playerGrid = this.clampPlayerToIsland();
            this.player.setDepth((playerGrid.gridX + playerGrid.gridY) * 10 + 6);
            this.playerInteractionRing.setPosition(this.player.x, this.player.y + 30);
            this.playerInteractionRing.setDepth(this.player.depth - 1);

            // Pickup Trash
            if (this.heldTrashArray.length < this.playerCap) {
                for (let i = 0; i < this.landTrash.length; i++) {
                    const t = this.landTrash[i];
                    if (Phaser.Math.Distance.Between(this.player.x, this.player.y, t.x, t.y) < 50) {
                        this.heldTrashArray.push(t.getData('type'));

                        if (this.gameMode === 'multi') {
                            this.roomChannel.send({
                                type: 'broadcast',
                                event: 'trash_picked',
                                payload: { id: t.getData('id') }
                            });
                        }

                        const variantKey = t.getData('variantKey') || t.texture.key;
                        const icon = this.add.image(this.player.x, this.player.y - 50 - (this.heldTrashArray.length - 1) * 20, variantKey).setScale(0.08).setDepth(this.player.depth + 1);
                        this.heldTrashIcons.push(icon);

                        const cell = t.getData('cell');
                        if (cell) cell.hasTrash = false;
                        this.landTrash.splice(i, 1);
                        t.destroy();
                        this.sound.play('build_sfx', { volume: 0.5 }); // Simple pickup sound

                        // Thưởng nhỏ cho việc nhặt rác thủ công & cập nhật Quest/Tutorial
                        this.money += 5;
                        this.ecoPoints += 2;
                        this.showFloatingText(this.player.x, this.player.y - 30, '+$5 | +2🌱', '#00ff00');
                        this.updateQuestProgress('q1', 1);
                        this.updateQuestProgress('q5', 1);
                        if (this.tutorialStep === 2) this.advanceTutorial();

                        this.updatePlayerStatus();
                        this.updateHUD(); // Update the counter instantly

                        if (this.heldTrashArray.length >= this.playerCap) break;
                    }
                }
            }

            // Update icons pos
            this.heldTrashIcons.forEach((icon, idx) => {
                icon.setPosition(this.player.x, this.player.y - 50 - idx * 20);
                icon.setDepth(this.player.depth + 1);
            });

            // Dropoff Trash
            if (this.heldTrashArray.length > 0) {
                const processors = this.buildings.filter(b => b.getData('isProcessor'));
                for (let b of processors) {
                    if (Phaser.Math.Distance.Between(this.player.x, this.player.y, b.x, b.y) < 80) {
                        const pType = b.getData('processType');

                        let processedCount = 0;
                        for (let i = this.heldTrashArray.length - 1; i >= 0; i--) {
                            const type = this.heldTrashArray[i];
                            if (pType === 'any' || pType === type) {
                                this.onTrashProcessed(b, type);
                                this.heldTrashArray.splice(i, 1);
                                this.heldTrashIcons[i].destroy();
                                this.heldTrashIcons.splice(i, 1);
                                processedCount++;
                            }
                        }

                        if (processedCount > 0) {
                            this.updatePlayerStatus();
                        }
                    }
                }
            }

            this.statusRefreshTimer -= delta;
            if (this.statusRefreshTimer <= 0) {
                this.statusRefreshTimer = 150;
                this.updatePlayerStatus();
            }
        }

        if (totalRate > 0) {
            const oldCleanliness = this.cleanliness;
            const elapsed = delta / 1000;
            this.cleanliness = Math.min(100, this.cleanliness + (totalRate * CONFIG.CLEAN_RATE_MULTIPLIER * elapsed));

            const prestigeMulti = 1 + (this.prestigePoints * 0.1);
            this.money += (totalIncomeRate + this.cleanliness / 5) * elapsed * this.incomeMultiplier * prestigeMulti;
            this.ecoPoints += (totalEcoRate + this.cleanliness / 10) * elapsed * this.incomeMultiplier * prestigeMulti;

            // Throttle mask/HUD: mỗi 500ms hoặc khi cleanliness thay đổi đáng kể
            this._hudTimer = (this._hudTimer || 0) + delta;
            if (this._hudTimer >= 500 || Math.floor(this.cleanliness) !== Math.floor(oldCleanliness)) {
                this._hudTimer = 0;
                this.updateMask();
                this.updateHUD();
            }

            if (Math.floor(this.cleanliness / 10) > Math.floor(oldCleanliness / 10)) {
                this.sound.play('clean_progress_sfx', { volume: 0.3 });
            }

            if (this.cleanliness >= 15) {
                this.updateQuestProgress('q4', 15);
            }
            if (this.cleanliness >= 50) {
                this.updateQuestProgress('q6', 50);
            }
            if (this.cleanliness >= 100) {
                this.updateQuestProgress('q7', 100);
            }

            // Milestones cho Professor Eco & Wildlife
            const milestones = [25, 50, 75, 100];
            milestones.forEach(m => {
                if (this.cleanliness >= m && !this.profEcoTriggered[m.toString()]) {
                    this.profEcoTriggered[m.toString()] = true;
                    this.triggerProfessorEvent(m);
                    if (m === 25) this.spawnWildlife('🐦', 5);
                    if (m === 50) this.spawnWildlife('🐇', 4);
                    if (m === 75) this.spawnWildlife('🦌', 3);
                }
            });

            if (this.cleanliness >= 100 && oldCleanliness < 100) {
                window.ProgressLogger.logProgress('win_cleanliness_100');
                if (this.gameMode !== 'multi') {
                    // endMatch handled by prestige menu later if they choose to stay
                }
            }
        }

        // Match Timer Update
        if (this.gameMode === 'multi') {
            if (this.matchDuration !== Infinity) {
                const elapsedS = delta / 1000;
                this.matchTimer -= elapsedS;

                const m = Math.max(0, Math.floor(this.matchTimer / 60));
                const s = Math.max(0, Math.floor(this.matchTimer % 60));
                this.matchTimerText.setText(`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);

                if (this.matchTimer <= 0) {
                    this.endMatch();
                    return;
                }
            } else {
                this.matchTimerText.setText(`VÔ HẠN`);
            }

            // Real network players don't need local simulation
            // Leaderboard and Mask updates are handled by sync_stats events
        } else if (this.gameState === 'PLAYING') {
            this.leaderboardTimer = (this.leaderboardTimer || 0) + delta;
            if (this.leaderboardTimer >= 1000) {
                this.leaderboardTimer = 0;
                if (this.bots && this.bots.length > 0) {
                    this.bots.forEach(bot => {
                        const growth = (5 + Math.random() * 10) * (bot.aggressiveness || 1.0);
                        bot.score = (Number(bot.score) || 0) + growth;
                    });
                    this.updateLeaderboard();
                }
            }
        }

        // Minigame Loop
        if (this.minigameActive) {
            this.minigameTimer -= delta;
            this.minigameTimerText.setText(`Thời gian: ${Math.ceil(this.minigameTimer / 1000)}s`);

            if (this.minigameTimer <= 0) {
                this.endMinigame();
            } else {
                // Move the bins left/right with keyboard (Arrow keys or A/D)
                const binSpeed = 700 * (delta / 1000);
                let binVx = 0;
                if (this.cursors.left.isDown || this.wasd.A.isDown) binVx -= 1;
                if (this.cursors.right.isDown || this.wasd.D.isDown) binVx += 1;
                if (binVx !== 0) {
                    this.minigameBinsContainer.x = Phaser.Math.Clamp(
                        this.minigameBinsContainer.x + binVx * binSpeed,
                        300,
                        this.cameras.main.width - 300
                    );
                }

                this.minigameSpawnTimer -= delta;
                if (this.minigameSpawnTimer <= 0) {
                    this.spawnMinigameTrash();
                    this.minigameSpawnTimer = Phaser.Math.Between(400, 800);
                }

                this.minigameItemsArray.forEach(item => {
                    if (item.active) {
                        item.y += (450 * (delta / 1000));

                        if (item.y > this.minigameBinsContainer.y - 60 && item.y < this.minigameBinsContainer.y + 60) {
                            const relativeX = item.x - this.minigameBinsContainer.x;
                            let caughtBin = null;
                            this.bins.forEach(bin => {
                                if (relativeX > bin.x - bin.width / 2 && relativeX < bin.x + bin.width / 2) {
                                    caughtBin = bin;
                                }
                            });

                            if (caughtBin) {
                                if (caughtBin.type === item.getData('trashType')) {
                                    this.minigameScore += 10;
                                    this.minigameScoreText.setText(`Điểm: ${this.minigameScore}`);
                                    this.sound.play('clean_progress_sfx');
                                    this.showFloatingText(item.x, item.y, '+10', '#00ff00');
                                } else {
                                    this.showFloatingText(item.x, item.y, 'SAI!', '#ff0000');
                                }
                                item.destroy();
                            }
                        } else if (item.y > this.cameras.main.height + 50) {
                            item.destroy();
                        }
                    }
                });
                this.minigameItemsArray = this.minigameItemsArray.filter(i => i.active);
            }
        }

        // Sea Minigame Loop
        if (this.seaMinigameActive) {
            this.seaMinigameTimer -= delta;
            this.minigameTimerText.setText(`Thời gian: ${Math.ceil(this.seaMinigameTimer / 1000)}s`);

            if (this.seaMinigameTimer <= 0) {
                this.endSeaMinigame();
            } else {
                // Move ship towards pointer
                const pointer = this.input.activePointer;
                const dist = Phaser.Math.Distance.Between(this.seaShip.x, this.seaShip.y, pointer.x, pointer.y);
                if (dist > 10) {
                    const angle = Phaser.Math.Angle.Between(this.seaShip.x, this.seaShip.y, pointer.x, pointer.y);
                    const speed = 400 * (delta / 1000);
                    this.seaShip.x += Math.cos(angle) * speed;
                    this.seaShip.y += Math.sin(angle) * speed;
                    this.seaShip.setRotation(angle + Math.PI / 2);
                }

                // Spawn logic
                if (this.seaItems.length < 10 && Math.random() < 0.03) {
                    this.spawnSeaTrash();
                }

                // Interaction and Movement
                for (let i = this.seaItems.length - 1; i >= 0; i--) {
                    const item = this.seaItems[i];

                    // Move item
                    item.x += item.getData('vx') * (delta / 1000);
                    item.y += item.getData('vy') * (delta / 1000);

                    // Remove if out of bounds
                    if (item.x < -50 || item.x > this.cameras.main.width + 50 ||
                        item.y < -50 || item.y > this.cameras.main.height + 50) {
                        item.destroy();
                        this.seaItems.splice(i, 1);
                        continue;
                    }

                    if (Phaser.Math.Distance.Between(this.seaShip.x, this.seaShip.y, item.x, item.y) < 60) {
                        const type = item.getData('type');
                        const bonus = type === 'oil_spill' ? 10 : 5;
                        this.seaMinigameScore += bonus;
                        this.minigameScoreText.setText(`Điểm: ${this.seaMinigameScore}`);

                        this.showFloatingText(item.x, item.y, `+${bonus}`, type === 'oil_spill' ? '#ffcc00' : '#00ffff');
                        item.destroy();
                        this.seaItems.splice(i, 1);
                        this.sound.play('clean_progress_sfx', { volume: 0.5 });
                    }
                }
            }
        }
    }

    updatePlacementPreview() {
        const pointer = this.input.activePointer;
        const isPlacing = this.selectedBuildingType || this.selectedDecorType;

        if (!isPlacing || this.isOverlayOpen() || this.minigameMenu.visible || pointer.y > this.cameras.main.height - 150) {
            if (this.placementPreview) this.placementPreview.setVisible(false);
            if (this.placementIndicator) this.placementIndicator.setVisible(false);
            return;
        }

        const gridPos = this.getGridPos(pointer.worldX, pointer.worldY);
        if (!gridPos) {
            if (this.placementPreview) this.placementPreview.setVisible(false);
            if (this.placementIndicator) this.placementIndicator.setVisible(false);
            return;
        }

        const cell = this.grid[gridPos.x][gridPos.y];
        let canPlace = cell.isBuildable && !cell.building && !cell.hasTrash;
        if (this.gameMode === 'multi' && cell.ownerIndex !== this.myIndex) {
            canPlace = false;
        }
        const type = this.selectedBuildingType || this.selectedDecorType;

        // Update or create indicator (the grid diamond)
        if (!this.placementIndicator) {
            this.placementIndicator = this.add.graphics().setDepth(5);
        }
        this.placementIndicator.clear();
        this.placementIndicator.setVisible(true);
        this.placementIndicator.fillStyle(canPlace ? 0x00ff00 : 0xff0000, 0.3);
        this.placementIndicator.lineStyle(2, canPlace ? 0x00ff00 : 0xff0000, 0.8);

        const hw = CONFIG.TILE_WIDTH / 2;
        const hh = CONFIG.TILE_HEIGHT / 2;
        this.placementIndicator.beginPath();
        this.placementIndicator.moveTo(cell.posX, cell.posY - hh);
        this.placementIndicator.lineTo(cell.posX + hw, cell.posY);
        this.placementIndicator.lineTo(cell.posX, cell.posY + hh);
        this.placementIndicator.lineTo(cell.posX - hw, cell.posY);
        this.placementIndicator.closePath();
        this.placementIndicator.fillPath();
        this.placementIndicator.strokePath();

        // Update or create preview sprite
        if (!this.placementPreview || this.placementPreview.texture.key !== type.key) {
            if (this.placementPreview) this.placementPreview.destroy();
            this.placementPreview = this.add.image(cell.posX, cell.posY, type.key).setAlpha(0.6).setDepth(2000);
            this.placementPreview.setScale(type.key.includes('tree') ? 0.12 : 0.1);
        }

        this.placementPreview.setVisible(true);
        this.placementPreview.setPosition(cell.posX, cell.posY - 10);
        this.placementPreview.setTint(canPlace ? 0xffffff : 0xffaaaa);
    }

    onTrashProcessed(building, trashType) {
        const level = building.getData('level');
        const processType = building.getData('processType');
        const isAdvanced = processType !== 'any';

        // Correct matching gives higher rewards
        const isMatch = isAdvanced && processType === trashType;

        let bonusMoney = 0;
        let bonusEco = 0;

        if (isMatch) {
            bonusMoney = 60 * level;
            bonusEco = 30 * level;

            // SFX & VFX feedback for matching types
            if (processType === 'metal') {
                this.sound.play('metal_process_sfx');
                this.sparkEmitter.explode(15, building.x, building.y - 20);
            } else if (processType === 'electronic') {
                this.sound.play('electronic_process_sfx');
                this.electronicEmitter.explode(12, building.x, building.y - 20);
            } else if (processType === 'organic') {
                this.sound.play('organic_process_sfx');
                this.smokeEmitter.explode(10, building.x, building.y - 30);
            } else if (processType === 'plastic') {
                this.sound.play('plastic_process_sfx');
                this.plasticEmitter.explode(15, building.x, building.y - 20);
            }
        }

        this.money += bonusMoney;
        this.ecoPoints += bonusEco;

        // Bump animation
        const currentScale = building.scaleX;
        this.tweens.add({
            targets: building,
            scaleX: currentScale * 1.15,
            scaleY: currentScale * 1.15,
            yoyo: true,
            duration: 100,
            onComplete: () => {
                building.setScale(currentScale);
            }
        });

        if (bonusMoney > 0 || bonusEco > 0) {
            // Floating text
            const floatText = this.add.text(building.x, building.y - 40, `+$${bonusMoney} | +${bonusEco}🌱`, {
                font: 'bold 14px Inter',
                fill: '#ffffff',
                stroke: '#006400',
                strokeThickness: 3
            }).setOrigin(0.5).setDepth(building.depth + 10);

            this.tweens.add({
                targets: floatText,
                y: floatText.y - 40,
                alpha: 0,
                duration: 1200,
                ease: 'Cubic.Out',
                onComplete: () => floatText.destroy()
            });
        }

        this.updateHUD();
    }

    updateMask() {
        const maxRadiusSingle = CONFIG.GRID_SIZE * CONFIG.TILE_WIDTH * this.islandGridScale * 1.5;
        const maxRadiusMulti = (CONFIG.GRID_SIZE / 2) * CONFIG.TILE_WIDTH * this.islandGridScale * 1.5; // smaller max radius for quadrants

        this.recoveryMaskGraphics.clear();
        this.thrivingMaskGraphics.clear();
        this.cleanMaskGraphics.clear();

        const drawStage = (graphics, cx, cy, score, maxRad) => {
            const stageProgress = (from, to) => {
                if (score <= from) return 0;
                if (score >= to) return 1;
                return (score - from) / (to - from);
            };

            const rad = maxRad * stageProgress(0, 100); // simplify: just grow based on score
            // For proper visual stages:
            const recRad = maxRad * stageProgress(0, 100 / 3);
            const thrRad = maxRad * stageProgress(100 / 3, 200 / 3);
            const clnRad = maxRad * stageProgress(200 / 3, 100);

            if (graphics === this.recoveryMaskGraphics && recRad > 0) {
                graphics.fillStyle(0xffffff);
                graphics.fillCircle(cx, cy, recRad);
            }
            if (graphics === this.thrivingMaskGraphics && thrRad > 0) {
                graphics.fillStyle(0xffffff);
                graphics.fillCircle(cx, cy, thrRad);
            }
            if (graphics === this.cleanMaskGraphics && clnRad > 0) {
                graphics.fillStyle(0xffffff);
                graphics.fillCircle(cx, cy, clnRad);
            }
        };

        if (this.gameMode === 'single') {
            const cx = this.cameras.main.width / 2;
            const cy = 380;
            drawStage(this.recoveryMaskGraphics, cx, cy, this.cleanliness, maxRadiusSingle);
            drawStage(this.thrivingMaskGraphics, cx, cy, this.cleanliness, maxRadiusSingle);
            drawStage(this.cleanMaskGraphics, cx, cy, this.cleanliness, maxRadiusSingle);
        } else {
            // Multi: Draw 4 circles
            const tw = CONFIG.TILE_WIDTH * this.islandGridScale;
            const th = CONFIG.TILE_HEIGHT * this.islandGridScale;

            const getGridPos = (gx, gy) => {
                return {
                    x: this.islandStartX + (gx - gy) * (tw / 2),
                    y: this.islandStartY + (gx + gy) * (th / 2)
                };
            };

            // Centers of 3 multiplayer regions matching startPositions (0: Left (2,8), 1: Right (8,2), 2: Bottom (8,8))
            const centers = [
                getGridPos(2, 8),
                getGridPos(8, 2),
                getGridPos(8, 8)
            ];

            for (let i = 0; i < 3; i++) {
                let score = this.playerCleanliness[i] || 0;
                if (i === this.myIndex) score = this.cleanliness; // local player uses exact score
                drawStage(this.recoveryMaskGraphics, centers[i].x, centers[i].y, score, maxRadiusMulti);
                drawStage(this.thrivingMaskGraphics, centers[i].x, centers[i].y, score, maxRadiusMulti);
                drawStage(this.cleanMaskGraphics, centers[i].x, centers[i].y, score, maxRadiusMulti);
            }
        }
    }

    triggerGameOver(reason) {
        this.gameState = 'ENDED';
        if (this.music) this.music.stop();
        this.sound.play('build_sfx', { rate: 0.5 }); // Play a slow sound for game over

        const overlay = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, this.cameras.main.width, this.cameras.main.height, 0x000, 0.9).setDepth(6000);

        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 120, 'GAME OVER', { font: 'bold 64px Inter', fill: '#ff0000' }).setOrigin(0.5).setDepth(6001);
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 40, reason, { font: 'bold 24px Inter', fill: '#ffffff' }).setOrigin(0.5).setDepth(6001);

        const btnBg = this.add.graphics().setDepth(6001);
        btnBg.fillStyle(0x4682b4, 1);
        btnBg.fillRoundedRect(this.cameras.main.width / 2 - 100, this.cameras.main.height / 2 + 40, 200, 50, 8);

        const btnTxt = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 65, 'THỬ LẠI', { font: 'bold 24px Inter', fill: '#ffffff' }).setOrigin(0.5).setDepth(6001);
        const hitArea = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2 + 65, 200, 50, 0x0, 0).setInteractive({ useHandCursor: true }).setDepth(6002);

        hitArea.on('pointerdown', () => {
            this.scene.restart();
        });
    }

    endMatch() {
        this.gameState = 'ENDED';
        this.updateLeaderboard(); // Final score

        const clean = isNaN(this.cleanliness) ? 0 : (this.cleanliness || 0);
        const mon = isNaN(this.money) ? 0 : (this.money || 0);
        const eco = isNaN(this.ecoPoints) ? 0 : (this.ecoPoints || 0);
        const playerScore = clean * 10 + mon * 0.1 + eco * 0.5;

        const safeBots = (this.bots || []).map(b => ({
            ...b,
            score: isNaN(b.score) ? 0 : (b.score || 0)
        }));

        const allPlayers = [
            { name: 'KHU 1 (BẠN)', score: isNaN(playerScore) ? 0 : playerScore, isPlayer: true }
        ];

        if (this.gameMode === 'multi') {
            allPlayers.push(...safeBots);
        }

        allPlayers.sort((a, b) => b.score - a.score);

        const myRank = allPlayers.findIndex(p => p.isPlayer) + 1;

        const overlay = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, this.cameras.main.width, this.cameras.main.height, 0x000, 0.9).setDepth(6000);

        const titleText = myRank === 1 ? 'CHIẾN THẮNG!' : 'KẾT THÚC TRẬN';
        const titleColor = myRank === 1 ? '#32cd32' : '#ffcc00';

        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 150, titleText, { font: 'bold 48px Inter', fill: titleColor }).setOrigin(0.5).setDepth(6001);

        const rankText = this.gameMode === 'multi' ? `Hạng của bạn: ${myRank} / ${allPlayers.length}` : `Điểm số tuyệt đối!`;
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 80, rankText, { font: 'bold 32px Inter', fill: '#ffffff' }).setOrigin(0.5).setDepth(6001);

        const displayFinalScore = Math.floor(isNaN(playerScore) ? 0 : playerScore);
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 20, `Điểm Tổng: ${displayFinalScore}`, { font: 'bold 24px Inter', fill: '#00ff00' }).setOrigin(0.5).setDepth(6001);

        const btnBg = this.add.graphics().setDepth(6001);
        btnBg.fillStyle(0x32cd32, 1);
        btnBg.fillRoundedRect(this.cameras.main.width / 2 - 100, this.cameras.main.height / 2 + 50, 200, 50, 8);

        const btnTxt = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 75, 'CHƠI LẠI', { font: 'bold 24px Inter', fill: '#ffffff' }).setOrigin(0.5).setDepth(6001);
        const hitArea = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2 + 75, 200, 50, 0x0, 0).setInteractive({ useHandCursor: true }).setDepth(6002);

        hitArea.on('pointerdown', () => {
            this.scene.restart();
        });
    }
}

// Giảm độ phân giải canvas trên mobile để tăng hiệu năng GPU
const isMobileDevice = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent) || (window.innerWidth <= 1024 && 'ontouchstart' in window);
const gameWidth = isMobileDevice ? 1280 : 1920;
const gameHeight = isMobileDevice ? 720 : 1080;

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    dom: {
        createContainer: true
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: gameWidth,
        height: gameHeight
    },
    backgroundColor: '#05101a',
    scene: [Preloader, LoginScene, MainMenuScene, LevelSelectScene, MatchmakingScene, EcoTycoon]
};

const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
    setTimeout(() => {
        if (game.scale) {
            game.scale.refresh();
        }
    }, 100);
});

// Tự động chuyển sang Fullscreen khi người chơi click lần đầu vào màn hình
window.addEventListener('pointerdown', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
            console.log(`Không thể bật chế độ fullscreen: ${err.message}`);
        });
    }
}, { once: true });