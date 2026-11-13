// =====================================================================
//  NỘI DUNG PORTFOLIO — sửa mọi thông tin tại file này, không cần build.
//  (Dự án & kinh nghiệm hiện là nội dung minh họa để test giao diện.)
// =====================================================================
window.PORTFOLIO = {
  name: 'Đức Anh',
  role: 'Full Stack Developer',
  tagline: 'Mình biến ý tưởng thành sản phẩm web nhanh, đẹp và chạy ổn định — từ giao diện đến API và cơ sở dữ liệu.',
  status: 'Đang mở cho dự án mới',
  email: 'hello@ducanh.dev',
  location: 'Hà Nội, Việt Nam · Remote',
  github: 'https://github.com/',
  linkedin: 'https://www.linkedin.com/',
  // true: form chỉ hiện thông báo thử nghiệm. false: mở ứng dụng email với nội dung soạn sẵn.
  demo: true,

  about: {
    intro: 'Mình là một lập trình viên full stack thích những sản phẩm vừa đẹp ở bề mặt vừa gọn gàng bên trong. Mình bắt đầu bằng việc làm giao diện, rồi tò mò về những gì chạy phía sau — API, dữ liệu, hạ tầng — và từ đó chọn đi trọn con đường.',
    more: 'Ngoài giờ code, mình vẽ minh họa, chơi với WebGL và chụp ảnh đường phố. Những thứ đó dạy mình cách nhìn chi tiết — điều mà mình mang vào từng màn hình mình làm.',
    story: [
      { year: '2017', text: 'Viết trang web đầu tiên bằng HTML thuần cho câu lạc bộ guitar của trường. Nó xấu, nhưng có 200 người truy cập — và mình bị “dính”.' },
      { year: '2019', text: 'Học React, làm đồ án nhóm đầu tiên có backend thật. Lần đầu hiểu cảm giác dữ liệu chạy từ database lên màn hình.' },
      { year: '2021', text: 'Nhận dự án freelance đầu tiên. Học được rằng code tốt thôi chưa đủ — phải hiểu khách hàng thật sự cần gì.' },
      { year: '2024', text: 'Dẫn dắt phát triển sản phẩm SaaS, hướng dẫn các bạn junior và bắt đầu chia sẻ kiến thức qua blog.' }
    ],
    facts: [
      { label: 'Sinh sống', value: 'Hà Nội, Việt Nam' },
      { label: 'Ngôn ngữ', value: 'Tiếng Việt · English (IELTS 7.0)' },
      { label: 'Hình thức', value: 'Full-time · Freelance · Remote' },
      { label: 'Múi giờ', value: 'GMT+7, linh hoạt họp với EU/US' }
    ],
    stats: [
      { value: '4+', label: 'năm làm web' },
      { value: '30+', label: 'dự án đã ship' },
      { value: '12', label: 'khách hàng & team' },
      { value: '98', label: 'điểm Lighthouse TB' }
    ],
    values: [
      { icon: 'compass', title: 'Rõ ràng trước', text: 'Hiểu đúng bài toán rồi mới chọn công nghệ. Giải pháp vừa đủ luôn thắng giải pháp phức tạp.' },
      { icon: 'sparkles', title: 'Chăm chút trải nghiệm', text: 'Chuyển động có chủ đích, trạng thái tải rõ ràng, dùng tốt bằng bàn phím và trên điện thoại.' },
      { icon: 'code', title: 'Code để người sau đọc', text: 'Module rõ ràng, test cho luồng quan trọng, tài liệu ngắn mà đủ.' },
      { icon: 'refresh', title: 'Ship sớm, cải thiện liên tục', text: 'Đưa bản chạy được tới người dùng thật càng sớm càng tốt, rồi đo đạc và lặp lại.' }
    ],
    now: [
      { icon: 'hammer', label: 'Đang xây', value: 'Một công cụ quản lý chi tiêu nhóm cho bạn bè đi du lịch' },
      { icon: 'learn', label: 'Đang học', value: 'Rust và WebGPU cho đồ họa hiệu năng cao' },
      { icon: 'book', label: 'Đang đọc', value: '“Designing Data-Intensive Applications”' },
      { icon: 'music', label: 'Đang nghe', value: 'Lo-fi, city pop và podcast công nghệ' }
    ],
    hobbies: ['Vẽ minh họa', 'Chụp ảnh đường phố', 'Đạp xe', 'Cà phê specialty', 'Board game', 'Creative coding']
  },

  services: [
    { icon: 'layout', title: 'Website & Landing page', text: 'Nhanh, chuẩn SEO, chuyển động tinh tế, dễ tự cập nhật nội dung.' },
    { icon: 'layers', title: 'Web app / SaaS', text: 'Từ MVP đến sản phẩm có người dùng: đăng nhập, thanh toán, dashboard.' },
    { icon: 'server', title: 'API & Backend', text: 'Thiết kế API, cơ sở dữ liệu, xác thực, tích hợp bên thứ ba.' },
    { icon: 'box', title: 'Trải nghiệm 3D / tương tác', text: 'Three.js, WebGL, hiệu ứng cuộn — những trang khiến người xem dừng lại.' }
  ],

  // level: 1–5 · years: số năm sử dụng
  skills: [
    { group: 'Frontend', color: '#7cc4ff', desc: 'Giao diện nhanh, đẹp, truy cập tốt trên mọi thiết bị.', items: [
      { name: 'React', level: 5, years: 4 }, { name: 'Next.js', level: 5, years: 3 }, { name: 'TypeScript', level: 5, years: 3 },
      { name: 'Tailwind CSS', level: 4, years: 3 }, { name: 'Framer Motion', level: 4, years: 2 }, { name: 'Three.js', level: 3, years: 2 }
    ] },
    { group: 'Backend', color: '#a78bfa', desc: 'API rõ ràng, an toàn, dễ mở rộng và dễ kiểm thử.', items: [
      { name: 'Node.js', level: 5, years: 4 }, { name: 'NestJS', level: 4, years: 2 }, { name: 'Express', level: 4, years: 4 },
      { name: 'GraphQL', level: 3, years: 2 }, { name: 'Go', level: 3, years: 1 }
    ] },
    { group: 'Dữ liệu', color: '#f2c38b', desc: 'Mô hình dữ liệu đúng ngay từ đầu, truy vấn tối ưu.', items: [
      { name: 'PostgreSQL', level: 5, years: 4 }, { name: 'Prisma', level: 4, years: 3 }, { name: 'Redis', level: 4, years: 2 },
      { name: 'MongoDB', level: 3, years: 2 }, { name: 'Supabase', level: 4, years: 2 }
    ] },
    { group: 'Mobile', color: '#ff8a7a', desc: 'App đa nền tảng với cảm giác native.', items: [
      { name: 'React Native', level: 4, years: 2 }, { name: 'Expo', level: 4, years: 2 }, { name: 'PWA', level: 4, years: 3 }
    ] },
    { group: 'DevOps & Công cụ', color: '#7fe3d4', desc: 'Đưa code lên production một cách tự động và yên tâm.', items: [
      { name: 'Docker', level: 4, years: 3 }, { name: 'GitHub Actions', level: 4, years: 3 }, { name: 'Vercel', level: 5, years: 3 },
      { name: 'AWS', level: 3, years: 2 }, { name: 'Figma', level: 4, years: 4 }
    ] }
  ],
  softSkills: ['Giao tiếp với khách hàng', 'Ước lượng & lập kế hoạch', 'Review code', 'Mentoring', 'Viết tài liệu', 'Làm việc remote'],
  learning: ['Rust', 'WebGPU', 'Kubernetes', 'AI Agents'],
  process: [
    { title: 'Khám phá', text: 'Trò chuyện, hiểu mục tiêu, người dùng và giới hạn. Chốt phạm vi rõ ràng.' },
    { title: 'Thiết kế', text: 'Luồng người dùng, wireframe, mô hình dữ liệu và hợp đồng API.' },
    { title: 'Xây dựng', text: 'Làm theo từng vòng 1–2 tuần, demo thường xuyên để bạn luôn thấy tiến độ.' },
    { title: 'Ra mắt & đồng hành', text: 'Triển khai, theo dõi, sửa lỗi và cải thiện dựa trên số liệu thật.' }
  ],

  projects: [
    {
      title: 'CommerceOS', category: 'Web App', year: '2026', cover: 'browser', colors: ['#f59e0b', '#ef4444'],
      tagline: 'Nền tảng thương mại điện tử cho cửa hàng thời trang vừa và nhỏ.',
      problem: 'Chủ shop quản lý đơn qua Excel và tin nhắn, tồn kho lệch liên tục giữa online và cửa hàng.',
      solution: 'Một storefront tốc độ cao kết hợp trang quản trị: đồng bộ tồn kho thời gian thực, thanh toán online và báo cáo doanh thu theo ngày.',
      features: ['Tìm kiếm & lọc sản phẩm tức thì', 'Thanh toán thẻ, ví và COD', 'Dashboard doanh thu, tồn kho', 'Phân quyền nhân viên'],
      result: 'Tỉ lệ chuyển đổi tăng 32%, thời gian xử lý đơn giảm còn một nửa.',
      tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe']
    },
    {
      title: 'Lumi', category: 'AI', year: '2026', cover: 'chat', colors: ['#8b5cf6', '#06b6d4'],
      tagline: 'Trợ lý học tập AI trả lời dựa trên chính tài liệu của bạn.',
      problem: 'Sinh viên có hàng trăm trang slide và giáo trình nhưng khó tìm lại đúng đoạn cần ôn.',
      solution: 'Tải tài liệu lên, Lumi chia nhỏ, tạo vector và trả lời câu hỏi kèm trích dẫn tới đúng trang. Có chế độ tự tạo flashcard và đề ôn tập.',
      features: ['Hỏi đáp có trích dẫn nguồn', 'Tự sinh flashcard & quiz', 'Hỗ trợ PDF, DOCX, slide', 'Streaming câu trả lời'],
      result: '2.000+ người dùng thử trong tháng đầu, 4.8★ đánh giá.',
      tech: ['Next.js', 'LLM API', 'pgvector', 'Supabase', 'Edge Functions']
    },
    {
      title: 'TeamFlow', category: 'Web App', year: '2025', cover: 'kanban', colors: ['#3b82f6', '#22d3ee'],
      tagline: 'Không gian làm việc nhóm với Kanban và chat thời gian thực.',
      problem: 'Nhóm nhỏ dùng 4–5 công cụ rời rạc để giao việc, trao đổi và theo dõi tiến độ.',
      solution: 'Một workspace duy nhất: bảng Kanban kéo thả, bình luận theo task, thông báo tức thì và timeline dự án.',
      features: ['Kéo thả mượt, đồng bộ nhiều người', 'Chat & mention theo task', 'Timeline / Gantt', 'Phân quyền theo workspace'],
      result: 'Được 3 team nội bộ dùng hằng ngày, thay thế 3 công cụ trả phí.',
      tech: ['React', 'Socket.IO', 'Node.js', 'Redis', 'PostgreSQL']
    },
    {
      title: 'FitPulse', category: 'Mobile', year: '2025', cover: 'phone', colors: ['#10b981', '#84cc16'],
      tagline: 'App theo dõi tập luyện và dinh dưỡng với biểu đồ tiến bộ.',
      problem: 'Người mới tập gym dễ bỏ cuộc vì không thấy được tiến bộ của bản thân.',
      solution: 'Ghi buổi tập trong 3 chạm, gợi ý mức tạ tiếp theo, biểu đồ tiến bộ theo tuần và chuỗi ngày tập (streak).',
      features: ['Ghi buổi tập offline', 'Gợi ý tăng tạ thông minh', 'Biểu đồ tiến bộ', 'Nhắc lịch & streak'],
      result: '10.000+ lượt tải, giữ chân người dùng 30 ngày đạt 41%.',
      tech: ['React Native', 'Expo', 'Supabase', 'Reanimated']
    },
    {
      title: 'DevAPI Gateway', category: 'Backend', year: '2025', cover: 'terminal', colors: ['#64748b', '#22c55e'],
      tagline: 'API gateway có xác thực, rate limit và tài liệu tự động.',
      problem: 'Nhiều dịch vụ nội bộ tự viết phần xác thực riêng, khó kiểm soát và khó debug.',
      solution: 'Một lớp gateway thống nhất: JWT + refresh token, RBAC, rate limit theo khóa, log tập trung và OpenAPI sinh tự động.',
      features: ['JWT, refresh token, RBAC', 'Rate limit & cache Redis', 'Tài liệu OpenAPI', 'Log & tracing tập trung'],
      result: 'Phục vụ 1,2 triệu request/ngày, độ trễ p95 dưới 40ms.',
      tech: ['NestJS', 'Redis', 'PostgreSQL', 'Docker', 'Swagger']
    },
    {
      title: 'Orbit Studio', category: 'Creative', year: '2025', cover: 'orbit', colors: ['#ec4899', '#8b5cf6'],
      tagline: 'Trình xem sản phẩm 3D tương tác cho trang bán hàng.',
      problem: 'Ảnh tĩnh không thể hiện được chất liệu và chi tiết của sản phẩm cao cấp.',
      solution: 'Viewer 3D nhẹ nhúng vào bất kỳ website nào: xoay, phóng to, đổi màu vật liệu, chú thích điểm nóng.',
      features: ['Đổi màu / chất liệu realtime', 'Hotspot chú thích', 'Tải dần, dưới 1MB', 'Hoạt động trên mobile'],
      result: 'Thời gian ở trang sản phẩm tăng gấp 2,4 lần.',
      tech: ['Three.js', 'React Three Fiber', 'GLSL', 'Vite']
    },
    {
      title: 'Phố Ăn', category: 'Web App', year: '2024', cover: 'map', colors: ['#f97316', '#facc15'],
      tagline: 'Bản đồ quán ăn ngon do cộng đồng gợi ý.',
      problem: 'Review quán ăn rải rác khắp các nhóm Facebook, khó tìm theo khu vực và khẩu vị.',
      solution: 'Bản đồ trực quan, lọc theo món, giá và khoảng cách. Người dùng đóng góp review kèm ảnh, có xếp hạng uy tín.',
      features: ['Bản đồ & lọc theo bán kính', 'Review kèm ảnh', 'Danh sách yêu thích', 'Chia sẻ lộ trình ăn uống'],
      result: '5.000+ quán được thêm bởi cộng đồng.',
      tech: ['Next.js', 'Mapbox', 'PostGIS', 'Cloudinary']
    },
    {
      title: 'PulseBoard', category: 'Backend', year: '2024', cover: 'chart', colors: ['#0ea5e9', '#6366f1'],
      tagline: 'Dashboard giám sát hệ thống thời gian thực.',
      problem: 'Đội vận hành phát hiện sự cố chậm vì số liệu nằm rải rác ở nhiều nơi.',
      solution: 'Thu thập metric từ các dịch vụ, hiển thị realtime qua WebSocket và cảnh báo qua Slack/Telegram khi vượt ngưỡng.',
      features: ['Biểu đồ realtime', 'Cảnh báo theo ngưỡng', 'Lưu trữ time-series', 'Dashboard tùy biến'],
      result: 'Thời gian phát hiện sự cố giảm từ 15 phút xuống dưới 1 phút.',
      tech: ['Go', 'WebSocket', 'TimescaleDB', 'React', 'Docker']
    },
    {
      title: 'Lofi Room', category: 'Creative', year: '2024', cover: 'wave', colors: ['#a855f7', '#f472b6'],
      tagline: 'Phòng nghe nhạc lo-fi chung, kèm đồng hồ Pomodoro.',
      problem: 'Học một mình dễ mất tập trung và thiếu động lực.',
      solution: 'Phòng nghe nhạc đồng bộ cho nhiều người, Pomodoro chung, cảnh nền động và trạng thái “đang tập trung” của bạn bè.',
      features: ['Phát nhạc đồng bộ', 'Pomodoro nhóm', 'Visualizer âm thanh', 'Cài đặt như app (PWA)'],
      result: 'Cao điểm 800 người online cùng lúc mùa thi.',
      tech: ['SvelteKit', 'Web Audio API', 'WebSocket', 'PWA']
    }
  ],

  highlights: [
    { value: '45%', label: 'giảm thời gian tải trang tại Nova Labs' },
    { value: '1,2M', label: 'request mỗi ngày qua gateway mình xây' },
    { value: '15+', label: 'dự án khách hàng tại Pixel Harbor' }
  ],

  experience: [
    { time: '2024 — Nay', role: 'Full Stack Developer', org: 'Nova Labs', place: 'Hà Nội', type: 'Toàn thời gian',
      text: 'Startup phát triển sản phẩm SaaS cho doanh nghiệp vừa và nhỏ. Mình phụ trách kiến trúc và phát triển từ giao diện đến hạ tầng cho 3 sản phẩm, từ ý tưởng đến khi có khách hàng trả phí.',
      points: ['Thiết kế kiến trúc Next.js + NestJS dùng chung, rút ngắn thời gian khởi tạo sản phẩm mới từ 3 tuần xuống 4 ngày', 'Giảm 45% thời gian tải trang bằng tối ưu ảnh, cache và streaming SSR', 'Xây hệ thống thanh toán theo gói, xử lý 2.000+ giao dịch mỗi tháng', 'Thiết lập CI/CD, test tự động và giám sát lỗi, giảm 70% bug lọt lên production', 'Hướng dẫn 2 bạn developer junior, tổ chức review code hằng tuần'],
      tech: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'Docker', 'AWS'] },
    { time: '2022 — 2024', role: 'Frontend Developer', org: 'Pixel Harbor Studio', place: 'Remote', type: 'Toàn thời gian',
      text: 'Studio thiết kế & phát triển sản phẩm số cho khách hàng trong và ngoài nước ở mảng thương mại, giáo dục và du lịch.',
      points: ['Làm 15+ dự án với React, TypeScript — từ landing page đến web app phức tạp', 'Xây design system dùng chung cho cả studio với 60+ component, rút ngắn 30% thời gian làm giao diện', 'Đưa điểm Lighthouse trung bình lên 95+ và đạt chuẩn truy cập WCAG AA', 'Làm việc trực tiếp với khách hàng Nhật Bản và Úc bằng tiếng Anh'],
      tech: ['React', 'TypeScript', 'Storybook', 'Framer Motion', 'Figma'] },
    { time: '2021 — 2022', role: 'Web Developer', org: 'Freelance', place: 'Việt Nam', type: 'Tự do',
      text: 'Nhận làm website bán hàng, landing page và công cụ nội bộ cho doanh nghiệp nhỏ và cá nhân.',
      points: ['Hoàn thành 10+ dự án đúng hạn, 100% khách hàng giới thiệu thêm khách mới', 'Tự lo trọn quy trình: trao đổi yêu cầu, thiết kế, code, triển khai và bảo trì', 'Xây công cụ quản lý đơn hàng giúp một shop giảm 3 giờ làm thủ công mỗi ngày'],
      tech: ['WordPress', 'React', 'Node.js', 'MySQL'] },
    { time: '2020', role: 'Thực tập sinh Frontend', org: 'FPT Software', place: 'Hà Nội', type: 'Thực tập',
      text: 'Tham gia dự án web nội bộ cho khách hàng Nhật trong 6 tháng.',
      points: ['Làm quen quy trình Agile/Scrum và review code chuyên nghiệp', 'Phát triển các màn hình quản trị với React và Redux'],
      tech: ['React', 'Redux', 'Jest'] }
  ],

  education: [
    { time: '2018 — 2022', title: 'Cử nhân Công nghệ Thông tin', org: 'Đại học Bách khoa Hà Nội', text: 'Chuyên ngành Kỹ thuật Phần mềm · GPA 3.4/4.0. Đồ án tốt nghiệp: hệ thống gợi ý sản phẩm thời gian thực.' }
  ],

  certificates: [
    { title: 'AWS Certified Developer – Associate', org: 'Amazon Web Services', year: '2025' },
    { title: 'Meta Front-End Developer', org: 'Coursera', year: '2023' },
    { title: 'Giải Ba Hackathon Sinh viên', org: 'Hackathon Việt Nam', year: '2021' },
    { title: 'IELTS Academic 7.0', org: 'British Council', year: '2021' }
  ],

  contact: {
    response: 'Thường phản hồi trong 24 giờ',
    hours: 'T2 – T6 · 9:00 – 18:00 (GMT+7)',
    open: [
      { label: 'Việc toàn thời gian', on: true },
      { label: 'Dự án freelance', on: true },
      { label: 'Cộng tác / side project', on: true },
      { label: 'Tư vấn kỹ thuật', on: false }
    ],
    topics: ['Website', 'Web app', 'Mobile app', 'Backend / API', 'Tuyển dụng', 'Khác'],
    faq: [
      { q: 'Một dự án thường mất bao lâu?', a: 'Landing page khoảng 1–2 tuần, web app MVP khoảng 4–8 tuần tùy phạm vi. Mình sẽ báo lịch cụ thể sau buổi trao đổi đầu tiên.' },
      { q: 'Mình cần chuẩn bị gì trước?', a: 'Chỉ cần mục tiêu, người dùng chính và vài trang tham khảo bạn thích. Chưa cần tài liệu yêu cầu hoàn chỉnh.' },
      { q: 'Sau khi bàn giao thì sao?', a: 'Mình hỗ trợ sửa lỗi miễn phí 30 ngày, kèm tài liệu hướng dẫn và có gói bảo trì nếu bạn cần.' }
    ]
  }
};
