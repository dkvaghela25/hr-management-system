const users = [
  // ================= ADMIN =================
  {
    id: "U1",
    name: "Divyang Vaghela",
    email: "admin@company.com",
    role: "ADMIN",
    department: "Management",
    managerId: null,
    isActive: true
  },

  // ================= HR =================
  {
    id: "U2",
    name: "Riya Sharma",
    email: "riya.hr@company.com",
    role: "HR",
    department: "Human Resources",
    managerId: "U1",
    isActive: true
  },
  {
    id: "U3",
    name: "Kunal Mehta",
    email: "kunal.hr@company.com",
    role: "HR",
    department: "Human Resources",
    managerId: "U1",
    isActive: true
  },

  // ================= PROJECT MANAGERS =================
  {
    id: "U4",
    name: "Amit Patel",
    email: "amit.pm@company.com",
    role: "PROJECT_MANAGER",
    department: "JS",
    managerId: "U1",
    isActive: true
  },
  {
    id: "U5",
    name: "Sneha Desai",
    email: "sneha.pm@company.com",
    role: "PROJECT_MANAGER",
    department: "PHP",
    managerId: "U1",
    isActive: true
  },
  {
    id: "U6",
    name: "Rahul Trivedi",
    email: "rahul.pm@company.com",
    role: "PROJECT_MANAGER",
    department: "AI",
    managerId: "U1",
    isActive: true
  },

  // ================= EMPLOYEES (Under PM U4) =================
  {
    id: "U7",
    name: "Priya Joshi",
    email: "priya@company.com",
    role: "EMPLOYEE",
    department: "JS",
    managerId: "U4",
    isActive: true
  },
  {
    id: "U8",
    name: "Hardik Shah",
    email: "hardik@company.com",
    role: "EMPLOYEE",
    department: "JS",
    managerId: "U4",
    isActive: true
  },
  {
    id: "U9",
    name: "Neha Verma",
    email: "neha@company.com",
    role: "EMPLOYEE",
    department: "JS",
    managerId: "U4",
    isActive: true
  },
  {
    id: "U10",
    name: "Jay Soni",
    email: "jay@company.com",
    role: "EMPLOYEE",
    department: "JS",
    managerId: "U4",
    isActive: true
  },
  {
    id: "U11",
    name: "Anjali Rao",
    email: "anjali@company.com",
    role: "EMPLOYEE",
    department: "JS",
    managerId: "U4",
    isActive: true
  },

  // ================= EMPLOYEES (Under PM U5) =================
  {
    id: "U12",
    name: "Vishal Kumar",
    email: "vishal@company.com",
    role: "EMPLOYEE",
    department: "PHP",
    managerId: "U5",
    isActive: true
  },
  {
    id: "U13",
    name: "Pooja Singh",
    email: "pooja@company.com",
    role: "EMPLOYEE",
    department: "PHP",
    managerId: "U5",
    isActive: true
  },
  {
    id: "U14",
    name: "Arjun Nair",
    email: "arjun@company.com",
    role: "EMPLOYEE",
    department: "PHP",
    managerId: "U5",
    isActive: true
  },
  {
    id: "U15",
    name: "Meera Iyer",
    email: "meera@company.com",
    role: "EMPLOYEE",
    department: "PHP",
    managerId: "U5",
    isActive: true
  },
  {
    id: "U16",
    name: "Rohit Jain",
    email: "rohit@company.com",
    role: "EMPLOYEE",
    department: "PHP",
    managerId: "U5",
    isActive: true
  },

  // ================= EMPLOYEES (Under PM U6) =================
  {
    id: "U17",
    name: "Simran Kaur",
    email: "simran@company.com",
    role: "EMPLOYEE",
    department: "AI",
    managerId: "U6",
    isActive: true
  },
  {
    id: "U18",
    name: "Yash Malhotra",
    email: "yash@company.com",
    role: "EMPLOYEE",
    department: "AI",
    managerId: "U6",
    isActive: true
  },
  {
    id: "U19",
    name: "Tanvi Gupta",
    email: "tanvi@company.com",
    role: "EMPLOYEE",
    department: "AI",
    managerId: "U6",
    isActive: true
  },
  {
    id: "U20",
    name: "Manav Bansal",
    email: "manav@company.com",
    role: "EMPLOYEE",
    department: "AI",
    managerId: "U6",
    isActive: true
  },
  {
    id: "U21",
    name: "Krisha Patel",
    email: "krisha@company.com",
    role: "EMPLOYEE",
    department: "AI",
    managerId: "U6",
    isActive: true
  }
];

export default users;