/**
 * Translations for the ProgressTrack Student Portal
 * Supports English (en) and Polish (pl)
 * 
 * Note: Only core UI elements are currently translated.
 * Individual page content (Dashboard stats, etc.) can be added as needed.
 */
export const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    homework: "Homework",
    attendance: "Attendance",
    grades: "Grades",
    activity: "Activity",
    github: "GitHub",
    codeReview: "Code Review",
    profile: "Profile",
    faq: "FAQ",
    messages: "Messages",
    showMore: "Show more",
    menu: "Menu",
    
    // Login
    loginTitle: "Student Portal Login",
    loginSubtitle: "Access your progress tracker",
    universityEmail: "University Email",
    password: "Password",
    signIn: "Sign In",
    forgotPassword: "Forgot Password?",
    needHelp: "Need help? Contact",
    jiraHelpdesk: "Jira Helpdesk",
    
    // Profile
    personalInfo: "Personal Information",
    studentId: "Student ID",
    personalEmail: "Personal Email",
    universityEmail: "University Email",
    group: "Group",
    specialisation: "Specialisation",
    program: "Program",
    semester: "Semester",
    
    // Messages
    noMessages: "No new messages",
    unreadMessages: "unread message",
    unreadMessagesPlural: "unread messages",
    from: "From",
    markAsRead: "Mark as read",
    markAsUnread: "Mark as unread",
    deleteMessage: "Delete",
    
    // FAQ
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Find answers to common questions",
    searchFaq: "Search FAQ...",
    allCategories: "All Categories",
    general: "General",
    gradesCategory: "Grades",
    attendanceCategory: "Attendance",
    technical: "Technical",
    codeReviewCategory: "Code Review",
    
    // Support
    support: "Support",
    contactSupport: "Contact Support",
    
    // Settings
    darkMode: "Dark Mode",
    language: "Language",
    
    // Common
    search: "Search",
    close: "Close",
    save: "Save",
    cancel: "Cancel",
    logout: "Logout",
  },
  pl: {
    // Navigation
    dashboard: "Panel główny",
    homework: "Zadania domowe",
    attendance: "Obecności",
    grades: "Oceny",
    activity: "Aktywność",
    github: "GitHub",
    codeReview: "Przegląd kodu",
    profile: "Profil",
    faq: "FAQ",
    messages: "Wiadomości",
    showMore: "Pokaż więcej",
    menu: "Menu",
    
    // Login
    loginTitle: "Logowanie do portalu studenckiego",
    loginSubtitle: "Uzyskaj dostęp do śledzenia postępów",
    universityEmail: "Email uniwersytecki",
    password: "Hasło",
    signIn: "Zaloguj się",
    forgotPassword: "Zapomniałeś hasła?",
    needHelp: "Potrzebujesz pomocy? Skontaktuj się z",
    jiraHelpdesk: "Jira Helpdesk",
    
    // Profile
    personalInfo: "Informacje osobiste",
    studentId: "ID studenta",
    personalEmail: "Email osobisty",
    universityEmail: "Email uniwersytecki",
    group: "Grupa",
    specialisation: "Specjalizacja",
    program: "Program studiów",
    semester: "Semestr",
    
    // Messages
    noMessages: "Brak nowych wiadomości",
    unreadMessages: "nieprzeczytana wiadomość",
    unreadMessagesPlural: "nieprzeczytane wiadomości",
    from: "Od",
    markAsRead: "Oznacz jako przeczytane",
    markAsUnread: "Oznacz jako nieprzeczytane",
    deleteMessage: "Usuń",
    
    // FAQ
    faqTitle: "Najczęściej zadawane pytania",
    faqSubtitle: "Znajdź odpowiedzi na często zadawane pytania",
    searchFaq: "Szukaj w FAQ...",
    allCategories: "Wszystkie kategorie",
    general: "Ogólne",
    gradesCategory: "Oceny",
    attendanceCategory: "Obecności",
    technical: "Techniczne",
    codeReviewCategory: "Przegląd kodu",
    
    // Support
    support: "Wsparcie",
    contactSupport: "Skontaktuj się ze wsparciem",
    
    // Settings
    darkMode: "Tryb ciemny",
    language: "Język",
    
    // Common
    search: "Szukaj",
    close: "Zamknij",
    save: "Zapisz",
    cancel: "Anuluj",
    logout: "Wyloguj",
  },
};

export type TranslationKey = keyof typeof translations.en;
