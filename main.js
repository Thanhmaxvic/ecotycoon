import Phaser from 'phaser';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xbvwvibzmpztwpcuiury.supabase.co';
const SUPABASE_KEY = 'sb_publishable_OZMtzpBZr3SqHL5qubR2LA_7O4RVRgo';
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const CONFIG = {
    TILE_WIDTH: 220,
    TILE_HEIGHT: 110,
    GRID_SIZE: 11,
    START_MONEY: 0,
    START_ECO_POINTS: 0,
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
    { id: 'speed', name: 'Tốc độ Robot', levels: [400, 500, 600, 750], costs: [0, 500, 1500, 3000] },
    { id: 'capacity', name: 'Sức chứa rác', levels: [1, 2, 3, 5], costs: [0, 800, 2000, 4000] }
];

const QUIZ_QUESTIONS = [
    { q: "Khí nhà kính nào có khả năng giữ nhiệt lớn nhất trên mỗi phân tử?", options: ["CO2", "Methane (CH4)", "CFCs", "N2O"], ans: 2 },
    { q: "Hiệp định Paris về biến đổi khí hậu nhằm mục tiêu giữ mức tăng nhiệt độ toàn cầu dưới bao nhiêu độ C?", options: ["1.5°C", "2.0°C", "2.5°C", "3.0°C"], ans: 1 },
    { q: "Hiện tượng 'tẩy trắng san hô' chủ yếu do nguyên nhân nào?", options: ["Ô nhiễm nhựa", "Nhiệt độ nước biển tăng", "Đánh bắt quá mức", "Rò rỉ dầu"], ans: 1 },
    { q: "Tài nguyên nào sau đây không thể phục hồi?", options: ["Đất canh tác", "Nước ngọt", "Than đá", "Rừng nguyên sinh"], ans: 2 },
    { q: "Công nghệ 'Thu hồi và lưu trữ carbon' (CCS) nhằm mục đích gì?", options: ["Lọc nước biển", "Tái chế nhựa", "Giảm phát thải CO2", "Tạo năng lượng gió"], ans: 2 },
    { q: "Rác thải điện tử (E-waste) chứa nhiều kim loại nặng độc hại nào sau đây?", options: ["Sắt và Nhôm", "Đồng và Kẽm", "Chì và Thủy ngân", "Canxi và Kali"], ans: 2 },
    { q: "Vi vi nhựa (Microplastics) có kích thước dưới bao nhiêu mm?", options: ["5mm", "10mm", "1mm", "20mm"], ans: 0 }
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
    { key: 'wind_turbine', name: 'Năng Lượng Gió', cost: 200, cleanRate: 1, incomeRate: 1, ecoRate: 1.0, isProcessor: false, unlockReq: null },
    { key: 'greenhouse', name: 'TT Nghiên Cứu', cost: 300, cleanRate: 1.5, incomeRate: 1.5, ecoRate: 2.0, isProcessor: false, unlockReq: null },
    { key: 'organic_composter_l1', name: 'Ủ Phân', cost: 800, cleanRate: 3.0, incomeRate: 1.0, ecoRate: 1.0, isProcessor: true, processType: 'organic', unlockReq: null, maxKey: 'organic_composter_max_new' },
    { key: 'plastic_recycler_l1', name: 'Tái Chế Nhựa', cost: 1200, cleanRate: 4.5, incomeRate: 1.5, ecoRate: 1.5, isProcessor: true, processType: 'plastic', unlockReq: 'plastic', maxKey: 'plastic_recycler_max' },
    { key: 'metal_recycler_l1', name: 'Tách Kim Loại', cost: 2500, cleanRate: 7.0, incomeRate: 2.5, ecoRate: 2.0, isProcessor: true, processType: 'metal', unlockReq: 'metal', maxKey: 'metal_recycler_max_new' },
    { key: 'circuit_recycler_l1', name: 'Tái Chế Điện Tử', cost: 2200, cleanRate: 8.0, incomeRate: 3.5, ecoRate: 3.0, isProcessor: true, processType: 'electronic', unlockReq: 'electronic', maxKey: 'circuit_recycler_max' }
];

const MAP_THEMES = [
    {
        id: 'tropical',
        name: 'Đảo Nhiệt Đới',
        desc: 'Hòn đảo khởi đầu với một cái cây linh hồn đang héo mòn. Hãy hồi sinh cái cây để cứu lấy hòn đảo.',
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
        this.add.text(cx, cy + 125, 'CHƠI KHÁCH', { font: 'bold 18px Inter', fill: '#fff' }).setOrigin(0.5);
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

        MAP_THEMES.forEach((theme, idx) => {
            const x = startX + idx * (cardW + gap);
            this.createMapCard(x, cardY, cardW, cardH, theme);
        });

        // Back button
        const btnBack = this.add.graphics();
        btnBack.fillStyle(0x555555, 0.9);
        btnBack.fillRoundedRect(20, this.cameras.main.height - 60, 140, 44, 8);
        this.add.text(90, this.cameras.main.height - 38, '⬅ QUAY LẠI', { font: 'bold 16px Inter', fill: '#fff' }).setOrigin(0.5);
        this.add.rectangle(90, this.cameras.main.height - 38, 140, 44, 0x0, 0).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('MainMenuScene'));
    }

    createMapCard(x, y, w, h, theme) {
        const bg = this.add.graphics();
        bg.fillStyle(0x14232c, 1);
        bg.fillRoundedRect(x - w / 2, y - h / 2, w, h, 16);
        bg.lineStyle(3, 0x4682b4, 1);
        bg.strokeRoundedRect(x - w / 2, y - h / 2, w, h, 16);

        // Preview image (polluted starting state of the theme)
        const preview = this.add.image(x, y - h / 2 + 110, theme.textures.polluted).setOrigin(0.5);
        const targetW = w - 30;
        const scale = targetW / preview.width;
        preview.setScale(scale);
        // Clip preview to a rounded rect area using a mask
        const clipShape = this.make.graphics({ x: 0, y: 0, add: false });
        clipShape.fillStyle(0xffffff);
        clipShape.fillRoundedRect(x - w / 2 + 12, y - h / 2 + 12, w - 24, 190, 10);
        preview.setMask(clipShape.createGeometryMask());

        this.add.text(x, y - h / 2 + 220, theme.name, { font: 'bold 22px Inter', fill: '#ffcc00' }).setOrigin(0.5);
        this.add.text(x, y - h / 2 + 255, theme.desc, {
            font: '14px Inter', fill: '#dddddd', align: 'center', wordWrap: { width: w - 30 }
        }).setOrigin(0.5, 0);

        const btnY = y + h / 2 - 40;
        const btnBg = this.add.graphics();
        btnBg.fillStyle(0x32cd32, 1);
        btnBg.fillRoundedRect(x - (w - 40) / 2, btnY - 22, w - 40, 44, 8);
        this.add.text(x, btnY, '▶ BẮT ĐẦU', { font: 'bold 18px Inter', fill: '#fff' }).setOrigin(0.5);
        this.add.rectangle(x, btnY, w - 40, 44, 0x0, 0).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('EcoTycoon', { mode: this.gameMode, mapTheme: theme.id }));

        // Whole card is hoverable/clickable too for convenience
        const hitArea = this.add.rectangle(x, y, w, h, 0x0, 0).setInteractive({ useHandCursor: true });
        hitArea.on('pointerdown', () => this.scene.start('EcoTycoon', { mode: this.gameMode, mapTheme: theme.id }));
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

class EcoTycoon extends Phaser.Scene {
    constructor() {
        super('EcoTycoon');
    }

    init(data) {
        this.gameMode = data.mode || 'single';
        this.mapTheme = MAP_THEMES.find(t => t.id === data.mapTheme) || MAP_THEMES[0];
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

        this.landTrash = [];
        this.player = null;
        this.playerStatusText = null;
        this.playerStatusPill = null;
        
        this.playerSpeedLevel = 1;
        this.playerCapLevel = 1;
        this.playerSpeed = ROBOT_UPGRADES[0].levels[0];
        this.playerCap = ROBOT_UPGRADES[1].levels[0];
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

        // Tạo popup hướng dẫn
        this.createTutorialPopup();

        if (this.gameMode === 'multi') {
            this.createLeaderboardUI();
            this.createMatchSetupMenu();
        } else {
            this.gameState = 'PLAYING';
            this.matchDuration = Infinity;
            this.matchTimer = Infinity;
            
            // Hiện hướng dẫn khi bắt đầu chơi đơn lần đầu
            this.time.delayedCall(800, () => this.showTutorial());
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
        
        if (this.gameMode === 'multi') {
            this.zones.push({ name: 'KHU 1 (BẠN)', cx: w * 0.25, cy: h * 0.65, isPlayer: true, scale: 1.1, gridScale: 0.5 });
            this.zones.push({ name: 'Khu 2 (Nga)', cx: w * 0.75, cy: h * 0.65, isPlayer: false, scale: 1.1, gridScale: 0.5 });
            this.zones.push({ name: 'Khu 3 (Tom)', cx: w * 0.25, cy: h * 0.25, isPlayer: false, scale: 1.1, gridScale: 0.5 });
            this.zones.push({ name: 'Khu 4 (Chen)', cx: w * 0.75, cy: h * 0.25, isPlayer: false, scale: 1.1, gridScale: 0.5 });
        } else {
            this.zones.push({ name: 'ĐẢO SINH THÁI', cx: w / 2, cy: 380, isPlayer: true, scale: 2.2, gridScale: 1.0 });
        }

        const t = this.mapTheme.textures;
        this.zoneVisuals = [];

        this.zones.forEach((zone) => {
            const pollutedIsland = this.add.image(zone.cx, zone.cy, t.polluted).setOrigin(0.5).setDepth(0).setScale(zone.scale);
            const recoveryIsland = this.add.image(zone.cx, zone.cy, t.recovery).setOrigin(0.5).setDepth(1).setScale(zone.scale);
            const thrivingIsland = this.add.image(zone.cx, zone.cy, t.thriving).setOrigin(0.5).setDepth(2).setScale(zone.scale);
            const cleanIsland = this.add.image(zone.cx, zone.cy, t.clean).setOrigin(0.5).setDepth(3).setScale(zone.scale);
            
            if (this.gameMode === 'multi') {
                this.add.text(zone.cx, zone.cy - 120, zone.name, {
                    font: 'bold 20px Inter',
                    fill: zone.isPlayer ? '#00ff00' : '#ffcc00',
                    stroke: '#000000',
                    strokeThickness: 4
                }).setOrigin(0.5).setDepth(5);
            }

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

                // Draw smaller scaled isometric cell visually
                drawGridCell(posX, posY, tw / 3, th / 3);

                this.grid[x][y] = {
                    x,
                    y,
                    posX,
                    posY,
                    isWater: false,
                    building: null,
                    pollutedDecor: null,
                    hasTrash: false,
                    isBuildable: x > 0 && x < CONFIG.GRID_SIZE - 1 && y > 0 && y < CONFIG.GRID_SIZE - 1
                };
            }
        }
    }

    setupTrashSpawner() {
        this.time.addEvent({
            delay: 3000,
            loop: true,
            callback: () => this.spawnTrashOnLand()
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
            
            cell.hasTrash = true;
            this.landTrash.push(trash);
            
            this.updateHUD();

            if (this.landTrash.length >= CONFIG.MAX_TRASH_ALLOWED) {
                this.triggerGameOver('RÁC ĐÃ NGẬP KÍN ĐẢO!');
            } else if (this.landTrash.length === Math.floor(CONFIG.MAX_TRASH_ALLOWED * 0.8)) {
                this.showToast('CẢNH BÁO: Rác sắp ngập đảo!');
            }
        } else {
            if (this.landTrash.length >= 10) {
                 this.triggerGameOver('RÁC ĐÃ NGẬP KÍN ĐẢO!');
            }
        }
    }

    setupPlayer() {
        const startX = this.islandStartX;
        const startY = this.islandStartY + (550 * this.islandGridScale);
        
        this.playerInteractionRing = this.add.ellipse(startX, startY + 30 * this.islandGridScale, 104 * this.islandGridScale, 28 * this.islandGridScale, 0x32cd32, 0.22)
            .setStrokeStyle(3, 0x9cff75, 0.75)
            .setDepth(995);
            
        this.player = this.add.image(startX, startY, 'worker_robot').setScale(0.07 * this.islandGridScale).setDepth(1000);
    }

    setupMask() {
        this.zoneVisuals.forEach((zv, idx) => {
            const zone = this.zones[idx];
            
            const recoveryGraphics = this.make.graphics();
            recoveryGraphics.fillStyle(0xffffff);
            recoveryGraphics.fillCircle(zone.cx, zone.cy, 0);
            zv.recoveryIsland.setMask(recoveryGraphics.createGeometryMask());

            const thrivingGraphics = this.make.graphics();
            thrivingGraphics.fillStyle(0xffffff);
            thrivingGraphics.fillCircle(zone.cx, zone.cy, 0);
            zv.thrivingIsland.setMask(thrivingGraphics.createGeometryMask());

            const cleanGraphics = this.make.graphics();
            cleanGraphics.fillStyle(0xffffff);
            cleanGraphics.fillCircle(zone.cx, zone.cy, 0);
            const cleanMask = cleanGraphics.createGeometryMask();
            zv.cleanIsland.setMask(cleanMask);

            zv.recoveryMaskGraphics = recoveryGraphics;
            zv.thrivingMaskGraphics = thrivingGraphics;
            zv.cleanMaskGraphics = cleanGraphics;
            
            if (zone.isPlayer) {
                this.maskCenter = { x: zone.cx, y: zone.cy };
                this.recoveryMaskGraphics = recoveryGraphics;
                this.thrivingMaskGraphics = thrivingGraphics;
                this.maskGraphics = cleanGraphics;
                this.geometryMask = cleanMask;
            }
        });
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

        // --- Quiz Button (Top Right, beside Minigame) ---
        const btnQuizBg = this.add.graphics().setScrollFactor(0).setDepth(1000);
        btnQuizBg.fillStyle(0xff00ff, 1);
        btnQuizBg.fillRoundedRect(this.cameras.main.width - 640, 20, 140, 45, 10);
        btnQuizBg.lineStyle(3, 0x8b008b);
        btnQuizBg.strokeRoundedRect(this.cameras.main.width - 640, 20, 140, 45, 10);
        
        const btnQuizHitArea = this.add.rectangle(this.cameras.main.width - 570, 42, 140, 45, 0x000, 0)
            .setInteractive({ useHandCursor: true })
            .setScrollFactor(0)
            .setDepth(1001);
            
        this.add.text(this.cameras.main.width - 570, 42, '📝 CÂU HỎI', {
            font: 'bold 14px Inter',
            fill: '#ffffff'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);

        btnQuizHitArea.on('pointerdown', (pointer) => {
            pointer.event.stopPropagation();
            this.showQuiz();
        });

        // --- Pause / Exit Button (Top Right, beside Quiz) ---
        const btnExitBg = this.add.graphics().setScrollFactor(0).setDepth(1000);
        btnExitBg.fillStyle(0xdc143c, 1);
        btnExitBg.fillRoundedRect(this.cameras.main.width - 800, 20, 140, 45, 10);
        btnExitBg.lineStyle(3, 0x8b0000);
        btnExitBg.strokeRoundedRect(this.cameras.main.width - 800, 20, 140, 45, 10);
        
        const btnExitHitArea = this.add.rectangle(this.cameras.main.width - 730, 42, 140, 45, 0x000, 0)
            .setInteractive({ useHandCursor: true })
            .setScrollFactor(0)
            .setDepth(1001);
            
        this.add.text(this.cameras.main.width - 730, 42, '⏸ TẠM DỪNG', {
            font: 'bold 14px Inter',
            fill: '#ffffff'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);

        btnExitHitArea.on('pointerdown', (pointer) => {
            pointer.event.stopPropagation();
            this.openExitMenu();
        });

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
                    this.selectedBuildingType = btn;
                    this.selectedDecorType = null;
                } else {
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
        let dist = Math.sqrt(dx*dx + dy*dy);
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

            this.selectedDecorType = null;
            this.highlightSelected({ setScale: () => {} }); // clear highlight

            this.updateHUD();
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
        if (cell.hasTrash) {
            this.showToast('Phải dọn rác trước khi xây dựng!');
            return;
        }

        if (this.money >= this.selectedBuildingType.cost) {
            this.money -= this.selectedBuildingType.cost;
            this.sound.play('build_sfx');
            
            // Remove polluted decor if it exists
            if (cell.pollutedDecor) {
                cell.pollutedDecor.destroy();
                cell.pollutedDecor = null;
            }
            
            const b = this.add.image(cell.posX, cell.posY + 18, this.selectedBuildingType.key).setScale(0.05).setAlpha(0.2);
            b.setData({
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
                isEvolved: false
            });
            b.setDepth(this.getDepthForCell(cell, 5));
            b.setData('constructionScale', 0.1);
            
            this.buildingGroup.add(b);
            // Buildings are NOT masked so they are always visible
            // b.setMask(this.geometryMask);

            cell.building = b;
            this.playConstructionEffect(b, cell.posX, cell.posY);
            this.buildings.push(b);
            this.selectedBuilding = b;
            this.selectedBuildingType = null;

            this.updateHUD();
            window.ProgressLogger.logProgress('building_placed', { type: b.getData('key') });
            this.checkFullMapWinCondition();
        } else {
            this.showToast('Không đủ tiền!');
        }
    }

    checkFullMapWinCondition() {
        if (this.gameState !== 'PLAYING') return;

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
        this.moneyText.setText(`$${Math.floor(this.money)}`);
        this.ecoPointsText.setText(`${Math.floor(this.ecoPoints)}`);
        this.cleanlinessValueText.setText(`${Math.floor(this.cleanliness)}%`);
        
        this.cleanProgressBar.clear();
        this.cleanProgressBar.fillStyle(0x32cd32, 1);
        const barWidth = Math.max(0, 178 * (this.cleanliness / 100));
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

    checkRobotEvolution() {
        const totalUpgrades = (this.playerSpeedLevel - 1) + (this.playerCapLevel - 1);
        let targetKey = 'worker_robot';
        let evolutionMsg = '';

        if (totalUpgrades >= 6) {
            targetKey = 'industrial_worker_robot';
            evolutionMsg = 'ROBOT TIẾN HÓA CÔNG NGHIỆP!';
        } else if (totalUpgrades >= 4) {
            targetKey = 'worker_robot_l3';
            evolutionMsg = 'ROBOT TIẾN HÓA BẬC CAO!';
        } else if (totalUpgrades >= 2) {
            targetKey = 'worker_robot_l2';
            evolutionMsg = 'ROBOT TIẾN HÓA BẬC TRUNG!';
        }

        if (this.player && this.player.texture.key !== targetKey) {
            this.tweens.add({
                targets: this.player,
                scale: 0,
                duration: 400,
                ease: 'Back.In',
                onComplete: () => {
                    this.player.setTexture(targetKey);
                    const newScale = targetKey === 'industrial_worker_robot' ? 0.13 : 0.12;
                    this.player.setScale(newScale);
                    this.tweens.add({
                        targets: this.player,
                        scale: newScale,
                        alpha: 1,
                        duration: 600,
                        ease: 'Back.Out'
                    });
                    this.dustEmitter.explode(20, this.player.x, this.player.y);
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
        btn1Bg.fillRoundedRect(px - 320, py - 20, 300, 150, 16);
        const btn1Txt = this.add.text(px - 170, py + 55, 'HỨNG RÁC\n(Phân loại đất)', { font: 'bold 20px Inter', fill: '#ffffff', align: 'center' }).setOrigin(0.5);
        const hit1 = this.add.rectangle(px - 170, py + 55, 300, 150, 0x0, 0).setInteractive({ useHandCursor: true });
        hit1.on('pointerdown', () => {
            this.minigameSelectionContainer.setVisible(false);
            this.showMinigameLeaderboard();
        });
        
        // Game 2: Sea Cleanup
        const btn2Bg = this.add.graphics();
        btn2Bg.fillStyle(0x4682b4, 1);
        btn2Bg.fillRoundedRect(px + 20, py - 20, 300, 150, 16);
        const btn2Txt = this.add.text(px + 170, py + 55, 'DỌN BIỂN\n(Bảo vệ đại dương)', { font: 'bold 20px Inter', fill: '#ffffff', align: 'center' }).setOrigin(0.5);
        const hit2 = this.add.rectangle(px + 170, py + 55, 300, 150, 0x0, 0).setInteractive({ useHandCursor: true });
        hit2.on('pointerdown', () => {
            this.minigameSelectionContainer.setVisible(false);
            this.startSeaCleanupGame();
        });

        const closeSel = this.add.text(px, py + 200, '✖ ĐÓNG', { font: 'bold 22px Inter', fill: '#ff4444' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        closeSel.on('pointerdown', () => this.minigameMenu.setVisible(false));
        
        this.minigameSelectionContainer.add([selTitle, btn1Bg, btn1Txt, hit1, btn2Bg, btn2Txt, hit2, closeSel]);
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
        
        const title = this.add.text(this.cameras.main.width / 2, py + 40, 'CHỌN THỜI GIAN TRẬN ĐẤU', { font: 'bold 24px Inter', fill: '#4682b4' }).setOrigin(0.5);
        
        this.matchSetupMenu.add([this.matchSetupOverlay, bg, title]);
        
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
            
            hitArea.on('pointerdown', () => this.startMatch(d.val));
            
            this.matchSetupMenu.add([btnBg, btnTxt, hitArea]);
        });
    }

    startMatch(seconds) {
        this.matchDuration = seconds;
        this.matchTimer = seconds;
        this.gameState = 'PLAYING';
        this.matchSetupMenu.setVisible(false);
        
        // Setup dynamic specialized bots
        this.bots = [
            { name: 'Khu 2 (Nga)', score: 0, specialty: 'organic', aggressiveness: 1.2 },
            { name: 'Khu 3 (Tom)', score: 0, specialty: 'plastic', aggressiveness: 1.0 },
            { name: 'Khu 4 (Chen)', score: 0, specialty: 'metal', aggressiveness: 0.9 }
        ];
        
        this.updateLeaderboard();
        this.updateHUD();
        if (this.music && !this.music.isPlaying) this.music.play();
    }
    
    updateLeaderboard() {
        if (!this.leaderboardTexts) return;
        
        const playerScore = this.cleanliness * 10 + this.money * 0.1 + this.ecoPoints * 0.5;
        
        const allPlayers = [
            { name: 'KHU 1 (BẠN)', score: playerScore, isPlayer: true },
            ...this.bots
        ];
        
        allPlayers.sort((a, b) => b.score - a.score);
        
        const botIcons = { 'organic': '🍌', 'plastic': '🥤', 'metal': '⚙️' };
        
        allPlayers.forEach((p, idx) => {
            if (idx < 4 && this.leaderboardTexts[idx]) {
                let color = p.isPlayer ? '#00ff00' : '#ffffff';
                let icon = p.isPlayer ? '👤' : botIcons[p.specialty];
                this.leaderboardTexts[idx].setText(`${idx + 1}. ${icon} ${p.name}: ${Math.floor(p.score)} điểm`).setFill(color);
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
        for(let i=0; i<4; i++) {
            const optY = py + 180 + i * 50;
            const btnBg = this.add.graphics();
            const btnText = this.add.text(this.cameras.main.width / 2, optY, '', { font: '16px Inter', fill: '#ffffff' }).setOrigin(0.5);
            const hitArea = this.add.rectangle(this.cameras.main.width / 2, optY, 500, 40, 0x000000, 0).setInteractive({ useHandCursor: true });
            
            this.quizMenu.add([btnBg, btnText, hitArea]);
            this.quizOptions.push({ bg: btnBg, text: btnText, hitArea: hitArea, y: optY });
        }
    }

    createTutorialPopup() {
        this.tutorialMenu = this.add.container(0, 0).setDepth(5500).setVisible(false).setScrollFactor(0);
        
        const overlay = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, this.cameras.main.width, this.cameras.main.height, 0x000, 0.85).setInteractive();
        
        const pw = 800, ph = 600;
        const px = (this.cameras.main.width - pw) / 2;
        const py = (this.cameras.main.height - ph) / 2;
        
        const bg = this.add.graphics();
        bg.fillStyle(0xffffff, 1);
        bg.fillRoundedRect(px, py, pw, ph, 20);
        bg.lineStyle(6, 0x4caf50);
        bg.strokeRoundedRect(px, py, pw, ph, 20);
        
        const title = this.add.text(this.cameras.main.width / 2, py + 40, 'HƯỚNG DẪN CHIẾN THUẬT ECO-TYCOON', { font: 'bold 30px Inter', fill: '#2e7d32' }).setOrigin(0.5);
        
        // Thêm background và title vào container trước
        this.tutorialMenu.add([overlay, bg, title]);
        
        const strategyPoints = [
            "🎮 DI CHUYỂN: Dùng WASD/Mũi tên. Theo dõi TIỀN, ECO và LƯỢNG RÁC ở góc trên bên trái.",
            "⚠️ CHIẾN THUẬT: Đừng để rác ngập đảo (quá 48 cụm)! Nếu quá tải, độ sạch sẽ giảm nhanh chóng.",
            "🧪 NGHIÊN CỨU: Vào 'TT Nghiên Cứu' để mở khóa công nghệ và máy móc hiện đại hơn.",
            "📚 THƯ VIỆN: Nơi giúp bạn phân biệt 4 loại rác (Hữu cơ, Nhựa, Kim loại, Điện tử) và cách xử lý.",
            "🕹️ MINI-GAME & QUIZ: Tham gia giải trí hoặc trả lời câu hỏi để kiếm thêm Tiền và Eco Points.",
            "🏗️ NÂNG CẤP: Click vào máy đã xây để nâng cấp lên Max Lv.5 giúp tăng mạnh hiệu suất.",
            "🏆 MỤC TIÊU: Hồi sinh hòn đảo đạt 100% ĐỘ SẠCH để giành chiến thắng!"
        ];
        
        strategyPoints.forEach((s, i) => {
            const txt = this.add.text(px + 40, py + 100 + i * 58, s, { 
                font: '17px Inter', 
                fill: '#333', 
                wordWrap: { width: 720 },
                lineSpacing: 10
            });
            this.tutorialMenu.add(txt);
        });
        
        const startBtnBg = this.add.graphics();
        startBtnBg.fillStyle(0x4caf50, 1);
        startBtnBg.fillRoundedRect(this.cameras.main.width / 2 - 120, py + ph - 70, 240, 50, 10);
        
        const startBtnTxt = this.add.text(this.cameras.main.width / 2, py + ph - 45, 'TÔI ĐÃ HIỂU', { font: 'bold 20px Inter', fill: '#ffffff' }).setOrigin(0.5);
        const startHit = this.add.rectangle(this.cameras.main.width / 2, py + ph - 45, 240, 50, 0x0, 0).setInteractive({ useHandCursor: true });
        
        startHit.on('pointerdown', () => {
            this.tutorialMenu.setVisible(false);
            if (this.music && !this.music.isPlaying) this.music.play();
        });
        
        // Thêm các nút bấm vào container sau cùng
        this.tutorialMenu.add([startBtnBg, startBtnTxt, startHit]);
    }
    
    showTutorial() {
        this.tutorialMenu.setVisible(true);
        this.tutorialMenu.setAlpha(0);
        this.tweens.add({ targets: this.tutorialMenu, alpha: 1, duration: 300 });
    }
    
    showQuiz() {
        const qData = QUIZ_QUESTIONS[Math.floor(Math.random() * QUIZ_QUESTIONS.length)];
        this.quizQuestion.setText(qData.q);
        
        this.quizOptions.forEach((opt, idx) => {
            if(idx < qData.options.length) {
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
            
            const floatText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'CHÍNH XÁC!\n+$150 | +50🌱', { font: 'bold 32px Inter', fill: '#00ff00', align:'center', stroke: '#000000', strokeThickness: 6 }).setOrigin(0.5).setDepth(5000);
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

        let totalRate = 0;
        let totalIncomeRate = 0;
        let totalEcoRate = 0;
        this.buildings.forEach(b => {
            totalRate += b.getData('cleanRate');
            totalIncomeRate += b.getData('incomeRate');
            totalEcoRate += b.getData('ecoRate');
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
                const length = Math.sqrt(vx*vx + vy*vy);
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
                        
                        const variantKey = t.getData('variantKey') || t.texture.key;
                        const icon = this.add.image(this.player.x, this.player.y - 50 - (this.heldTrashArray.length - 1) * 20, variantKey).setScale(0.08).setDepth(this.player.depth + 1);
                        this.heldTrashIcons.push(icon);
                        
                        const cell = t.getData('cell');
                        if (cell) cell.hasTrash = false;
                        this.landTrash.splice(i, 1);
                        t.destroy();
                        this.sound.play('build_sfx', { volume: 0.5 }); // Simple pickup sound
                        
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
            this.money += (totalIncomeRate + this.cleanliness / 5) * elapsed * this.incomeMultiplier;
            this.ecoPoints += (totalEcoRate + this.cleanliness / 10) * elapsed * this.incomeMultiplier;

            this.updateMask();
            this.updateHUD();

            if (Math.floor(this.cleanliness / 10) > Math.floor(oldCleanliness / 10)) {
                this.sound.play('clean_progress_sfx', { volume: 0.3 });
            }

            if (this.cleanliness >= 100 && oldCleanliness < 100) {
                window.ProgressLogger.logProgress('win_cleanliness_100');
                this.endMatch();
            }
        }

        // Match Timer Update
        if (this.gameMode === 'multi') {
            const elapsedS = delta / 1000;
            this.matchTimer -= elapsedS;
            
            const m = Math.max(0, Math.floor(this.matchTimer / 60));
            const s = Math.max(0, Math.floor(this.matchTimer % 60));
            this.matchTimerText.setText(`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
            
            if (this.matchTimer <= 0) {
                this.endMatch();
                return;
            }

            // Leaderboard Update
            this.leaderboardTimer += delta;
            if (this.leaderboardTimer > 1000) {
                this.leaderboardTimer = 0;
                
                const progress = 1 - (this.matchTimer / this.matchDuration);

                this.bots.forEach((b, idx) => {
                    const simulatedLevel = 1 + progress * 4; // Scales from 1 to 5
                    const trashCount = Math.random() < 0.5 ? 1 : 2; 

                    for(let i=0; i<trashCount; i++) {
                        const trash = TRASH_TYPES[Math.floor(Math.random() * TRASH_TYPES.length)].type;
                        let gainedScore = 4 * simulatedLevel; // Basic processing score
                        let cleanRate = 0.5;

                        if (trash === b.specialty && Math.random() < 0.85 * b.aggressiveness) {
                            gainedScore = 21 * simulatedLevel; // Optimal match score
                            cleanRate = 2.0;
                        } else if (Math.random() < 0.15 * b.aggressiveness) {
                            gainedScore = 21 * simulatedLevel; // Lucky non-specialty match
                            cleanRate = 1.0;
                        }

                        b.score += gainedScore * (0.9 + Math.random() * 0.2); // Add slight variance
                        b.cleanliness = Math.min(100, (b.cleanliness || 0) + cleanRate * CONFIG.CLEAN_RATE_MULTIPLIER * 5);
                    }
                    
                    this.updateZoneMask(idx + 1, b.cleanliness || 0);
                });
                this.updateLeaderboard();
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
                                if (relativeX > bin.x - bin.width/2 && relativeX < bin.x + bin.width/2) {
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
                    this.seaShip.setRotation(angle + Math.PI/2);
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
        const canPlace = cell.isBuildable && !cell.building && !cell.hasTrash;
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

    updateZoneMask(zoneIndex, cleanlinessScore) {
        const zone = this.zones[zoneIndex];
        const zv = this.zoneVisuals[zoneIndex];
        const tw = CONFIG.TILE_WIDTH * zone.gridScale;
        const maxRadius = CONFIG.GRID_SIZE * tw * 1.5;
        
        const stageProgress = (from, to) => {
            if (cleanlinessScore <= from) return 0;
            if (cleanlinessScore >= to) return 1;
            return (cleanlinessScore - from) / (to - from);
        };
        
        const recRad = maxRadius * stageProgress(0, 100 / 3);
        const thrRad = maxRadius * stageProgress(100 / 3, 200 / 3);
        const clnRad = maxRadius * stageProgress(200 / 3, 100);
        
        zv.recoveryMaskGraphics.clear();
        zv.recoveryMaskGraphics.fillStyle(0xffffff);
        zv.recoveryMaskGraphics.fillCircle(zone.cx, zone.cy, recRad);

        zv.thrivingMaskGraphics.clear();
        zv.thrivingMaskGraphics.fillStyle(0xffffff);
        zv.thrivingMaskGraphics.fillCircle(zone.cx, zone.cy, thrRad);

        zv.cleanMaskGraphics.clear();
        zv.cleanMaskGraphics.fillStyle(0xffffff);
        zv.cleanMaskGraphics.fillCircle(zone.cx, zone.cy, clnRad);
    }

    updateMask() {
        this.updateZoneMask(0, this.cleanliness);
    }

    triggerGameOver(reason) {
        this.gameState = 'ENDED';
        if (this.music) this.music.stop();
        this.sound.play('build_sfx', { rate: 0.5 }); // Play a slow sound for game over

        const overlay = this.add.rectangle(this.cameras.main.width/2, this.cameras.main.height/2, this.cameras.main.width, this.cameras.main.height, 0x000, 0.9).setDepth(6000);
        
        this.add.text(this.cameras.main.width/2, this.cameras.main.height/2 - 120, 'GAME OVER', { font: 'bold 64px Inter', fill: '#ff0000' }).setOrigin(0.5).setDepth(6001);
        this.add.text(this.cameras.main.width/2, this.cameras.main.height/2 - 40, reason, { font: 'bold 24px Inter', fill: '#ffffff' }).setOrigin(0.5).setDepth(6001);

        const btnBg = this.add.graphics().setDepth(6001);
        btnBg.fillStyle(0x4682b4, 1);
        btnBg.fillRoundedRect(this.cameras.main.width/2 - 100, this.cameras.main.height/2 + 40, 200, 50, 8);
        
        const btnTxt = this.add.text(this.cameras.main.width/2, this.cameras.main.height/2 + 65, 'THỬ LẠI', { font: 'bold 24px Inter', fill: '#ffffff' }).setOrigin(0.5).setDepth(6001);
        const hitArea = this.add.rectangle(this.cameras.main.width/2, this.cameras.main.height/2 + 65, 200, 50, 0x0, 0).setInteractive({ useHandCursor: true }).setDepth(6002);
        
        hitArea.on('pointerdown', () => {
            this.scene.restart();
        });
    }

    endMatch() {
        this.gameState = 'ENDED';
        this.updateLeaderboard(); // Final score

        const playerScore = this.cleanliness * 10 + this.money * 0.1 + this.ecoPoints * 0.5;
        const allPlayers = [
            { name: 'KHU 1 (BẠN)', score: playerScore, isPlayer: true }
        ];
        
        if (this.gameMode === 'multi') {
            allPlayers.push(...this.bots);
        }
        
        allPlayers.sort((a, b) => b.score - a.score);
        
        const myRank = allPlayers.findIndex(p => p.isPlayer) + 1;
        
        const overlay = this.add.rectangle(this.cameras.main.width/2, this.cameras.main.height/2, this.cameras.main.width, this.cameras.main.height, 0x000, 0.9).setDepth(6000);
        
        const titleText = myRank === 1 ? 'CHIẾN THẮNG!' : 'KẾT THÚC TRẬN';
        const titleColor = myRank === 1 ? '#32cd32' : '#ffcc00';
        
        this.add.text(this.cameras.main.width/2, this.cameras.main.height/2 - 150, titleText, { font: 'bold 48px Inter', fill: titleColor }).setOrigin(0.5).setDepth(6001);
        
        const rankText = this.gameMode === 'multi' ? `Hạng của bạn: ${myRank} / ${allPlayers.length}` : `Điểm số tuyệt đối!`;
        this.add.text(this.cameras.main.width/2, this.cameras.main.height/2 - 80, rankText, { font: 'bold 32px Inter', fill: '#ffffff' }).setOrigin(0.5).setDepth(6001);
        
        this.add.text(this.cameras.main.width/2, this.cameras.main.height/2 - 20, `Điểm Tổng: ${Math.floor(playerScore)}`, { font: 'bold 24px Inter', fill: '#00ff00' }).setOrigin(0.5).setDepth(6001);

        const btnBg = this.add.graphics().setDepth(6001);
        btnBg.fillStyle(0x32cd32, 1);
        btnBg.fillRoundedRect(this.cameras.main.width/2 - 100, this.cameras.main.height/2 + 50, 200, 50, 8);
        
        const btnTxt = this.add.text(this.cameras.main.width/2, this.cameras.main.height/2 + 75, 'CHƠI LẠI', { font: 'bold 24px Inter', fill: '#ffffff' }).setOrigin(0.5).setDepth(6001);
        const hitArea = this.add.rectangle(this.cameras.main.width/2, this.cameras.main.height/2 + 75, 200, 50, 0x0, 0).setInteractive({ useHandCursor: true }).setDepth(6002);
        
        hitArea.on('pointerdown', () => {
            this.scene.restart();
        });
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    dom: {
        createContainer: true
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    backgroundColor: '#05101a',
    scene: [Preloader, LoginScene, MainMenuScene, LevelSelectScene, EcoTycoon]
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
});