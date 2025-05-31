import { useState, useEffect } from 'react';

export default function ComingSoon() {
    const [darkMode, setDarkMode] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Set launch date to 15 days from now
        const targetDate = new Date().getTime() + 1000 * 60 * 60 * 24 * 15; 
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
                mins: Math.floor((distance / (1000 * 60)) % 60),
                secs: Math.floor((distance / 1000) % 60),
            });
        }, 1000);
        
        // Fade in effect
        setTimeout(() => setVisible(true), 100);
        
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={`font-['Inter'] ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'} min-h-screen flex flex-col items-center justify-center transition-colors duration-500`}>
            {/* Light background pattern */}
            <div className={`absolute inset-0 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} bg-opacity-50`} 
                style={{ backgroundImage: darkMode ? 'none' : 'radial-gradient(#e0e0e0 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>
            
            <button
                className={`absolute top-6 right-6 p-2 rounded-full ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} shadow-sm transition-all duration-300 hover:scale-105 z-10`}
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle dark mode"
            >
                {darkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                )}
            </button>

            <main className={`z-10 max-w-screen-md w-full px-4 sm:px-6 py-8 sm:py-12 transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
                {/* Hero Section */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-center tracking-tight transition-colors duration-500">
                    We&apos;re Launching Soon!
                </h1>
                
                <p className="text-lg md:text-xl text-center mb-12 max-w-lg mx-auto text-opacity-90 transition-colors duration-500">
                    Something amazing is on its way. Stay tuned!
                </p>

                {/* Countdown Timer */}
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 mb-16">
                    {[['Days', timeLeft.days], ['Hours', timeLeft.hours], ['Minutes', timeLeft.mins], ['Seconds', timeLeft.secs]].map(([label, value]) => (
                        <div key={label} className="text-center min-w-[60px]">
                            <div className={`text-3xl sm:text-4xl md:text-5xl font-light mb-1 transition-all duration-500 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                                {String(value).padStart(2, '0')}
                            </div>
                            <div className={`text-xs uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Email Signup Form */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-3 mb-16 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className={`w-full md:flex-1 px-4 py-3 rounded-md border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                    />
                    <button className={`w-full md:w-auto whitespace-nowrap px-8 py-3 rounded-md font-medium transition-all duration-300 ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>
                        Notify Me
                    </button>
                </div>

                {/* Social Media Icons */}
                <div className="flex justify-center space-x-8">
                    {[
                        { name: 'twitter', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/></svg> },
                        { name: 'instagram', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/></svg> },
                        { name: 'linkedin', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg> }
                    ].map((social) => (
                        <a
                            key={social.name}
                            href="#!"
                            className={`opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`}
                            aria-label={social.name}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            </main>
        </div>
    );
}
