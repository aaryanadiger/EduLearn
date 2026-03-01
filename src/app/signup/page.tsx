"use client";

import { TopNav, BottomNav } from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Github, Phone, Globe } from "lucide-react";
import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import JSConfetti from 'js-confetti';

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Form State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { user, loading, signupWithEmail, loginWithGoogle, loginWithGithub, loginWithApple } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push('/');
        }
    }, [user, loading, router]);

    const handleEmailSignup = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }
        if (password.length < 8) {
            return setError("Password must be at least 8 characters");
        }

        setIsLoading(true);
        try {
            await signupWithEmail(email, password, name);
            const jsConfetti = new JSConfetti();
            await jsConfetti.addConfetti({
                emojis: ['✉️', '✅', '✨'],
                confettiNumber: 60,
            });
            setError("Verification email sent! Please check your inbox before logging in.");
            setTimeout(() => {
                router.push("/login");
            }, 3000);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || "Failed to create account. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            await loginWithGoogle();
            const jsConfetti = new JSConfetti();
            await jsConfetti.addConfetti({
                emojis: ['🪙', '🎉', '✨'],
                confettiNumber: 60,
            });
            setTimeout(() => {
                router.push("/");
            }, 1000);
        } catch (err) {
            setError("Failed to sign up with Google.");
        }
    };

    const handleGithubSignup = async () => {
        try {
            await loginWithGithub();
            const jsConfetti = new JSConfetti();
            await jsConfetti.addConfetti({
                emojis: ['🪙', '🎉', '✨'],
                confettiNumber: 60,
            });
            setTimeout(() => {
                router.push("/");
            }, 1000);
        } catch (err) {
            setError("Failed to sign up with GitHub.");
        }
    };

    const handleAppleSignup = async () => {
        try {
            await loginWithApple();
            const jsConfetti = new JSConfetti();
            await jsConfetti.addConfetti({
                emojis: ['🪙', '🎉', '✨'],
                confettiNumber: 60,
            });
            setTimeout(() => {
                router.push("/");
            }, 1000);
        } catch (err) {
            setError("Failed to sign up with Apple.");
        }
    };

    return (
        <main className="min-h-screen bg-primary text-secondary selection:bg-accent selection:text-white flex flex-col">
            <CustomCursor />
            <TopNav />
            <BottomNav />

            <SmoothScroll>
                <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto flex-grow w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                        {/* Form Section */}
                        <div className="w-full lg:col-span-7">
                            <div className="mb-10">
                                <h1 className="text-5xl font-bold tracking-tighter mb-4">Join <span className="text-accent">EduLearn</span></h1>
                                <p className="text-neutral-400 font-light text-lg">
                                    Start your learning journey with us today and unlock a world of knowledge.
                                </p>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                                    {error}
                                </div>
                            )}

                            <form className="space-y-6" onSubmit={handleEmailSignup}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Username */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-2">Username</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-neutral-500 group-focus-within:text-accent transition-colors" />
                                            </div>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter full name"
                                                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-accent transition-colors config-bg placeholder:text-neutral-600"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-2">Email Address</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-neutral-500 group-focus-within:text-accent transition-colors" />
                                            </div>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your email"
                                                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-accent transition-colors config-bg placeholder:text-neutral-600"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-2">Password</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-neutral-500 group-focus-within:text-accent transition-colors" />
                                            </div>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Create a password"
                                                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-12 pr-12 text-white focus:outline-none focus:border-accent transition-colors config-bg placeholder:text-neutral-600"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-500 hover:text-white transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                            </button>
                                        </div>
                                        <p className="text-xs text-neutral-600 mt-2">Password must be at least 8 characters long</p>
                                    </div>

                                    {/* Confirm Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-2">Confirm Password</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-neutral-500 group-focus-within:text-accent transition-colors" />
                                            </div>
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="Confirm password"
                                                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-12 pr-12 text-white focus:outline-none focus:border-accent transition-colors config-bg placeholder:text-neutral-600"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-500 hover:text-white transition-colors"
                                            >
                                                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Phone (Optional) */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-2">Phone Number (Optional)</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Phone className="h-5 w-5 text-neutral-500 group-focus-within:text-accent transition-colors" />
                                            </div>
                                            <input
                                                type="tel"
                                                placeholder="Phone number"
                                                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-accent transition-colors config-bg placeholder:text-neutral-600"
                                            />
                                        </div>
                                    </div>

                                    {/* Country */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-2">Country</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Globe className="h-5 w-5 text-neutral-500 group-focus-within:text-accent transition-colors" />
                                            </div>
                                            <select
                                                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-accent transition-colors config-bg appearance-none cursor-pointer"
                                                required
                                                defaultValue=""
                                            >
                                                <option value="" disabled className="text-neutral-600">Select your country</option>
                                                <option value="AF">Afghanistan</option>
                                                <option value="AL">Albania</option>
                                                <option value="DZ">Algeria</option>
                                                <option value="AD">Andorra</option>
                                                <option value="AO">Angola</option>
                                                <option value="AR">Argentina</option>
                                                <option value="AM">Armenia</option>
                                                <option value="AU">Australia</option>
                                                <option value="AT">Austria</option>
                                                <option value="AZ">Azerbaijan</option>
                                                <option value="BS">Bahamas</option>
                                                <option value="BH">Bahrain</option>
                                                <option value="BD">Bangladesh</option>
                                                <option value="BB">Barbados</option>
                                                <option value="BY">Belarus</option>
                                                <option value="BE">Belgium</option>
                                                <option value="BZ">Belize</option>
                                                <option value="BJ">Benin</option>
                                                <option value="BT">Bhutan</option>
                                                <option value="BO">Bolivia</option>
                                                <option value="BA">Bosnia and Herzegovina</option>
                                                <option value="BW">Botswana</option>
                                                <option value="BR">Brazil</option>
                                                <option value="BN">Brunei</option>
                                                <option value="BG">Bulgaria</option>
                                                <option value="BF">Burkina Faso</option>
                                                <option value="BI">Burundi</option>
                                                <option value="KH">Cambodia</option>
                                                <option value="CM">Cameroon</option>
                                                <option value="CA">Canada</option>
                                                <option value="CV">Cape Verde</option>
                                                <option value="CF">Central African Republic</option>
                                                <option value="TD">Chad</option>
                                                <option value="CL">Chile</option>
                                                <option value="CN">China</option>
                                                <option value="CO">Colombia</option>
                                                <option value="KM">Comoros</option>
                                                <option value="CG">Congo</option>
                                                <option value="CR">Costa Rica</option>
                                                <option value="HR">Croatia</option>
                                                <option value="CU">Cuba</option>
                                                <option value="CY">Cyprus</option>
                                                <option value="CZ">Czech Republic</option>
                                                <option value="DK">Denmark</option>
                                                <option value="DJ">Djibouti</option>
                                                <option value="DM">Dominica</option>
                                                <option value="DO">Dominican Republic</option>
                                                <option value="EC">Ecuador</option>
                                                <option value="EG">Egypt</option>
                                                <option value="SV">El Salvador</option>
                                                <option value="GQ">Equatorial Guinea</option>
                                                <option value="ER">Eritrea</option>
                                                <option value="EE">Estonia</option>
                                                <option value="ET">Ethiopia</option>
                                                <option value="FJ">Fiji</option>
                                                <option value="FI">Finland</option>
                                                <option value="FR">France</option>
                                                <option value="GA">Gabon</option>
                                                <option value="GM">Gambia</option>
                                                <option value="GE">Georgia</option>
                                                <option value="DE">Germany</option>
                                                <option value="GH">Ghana</option>
                                                <option value="GR">Greece</option>
                                                <option value="GD">Grenada</option>
                                                <option value="GT">Guatemala</option>
                                                <option value="GN">Guinea</option>
                                                <option value="GW">Guinea-Bissau</option>
                                                <option value="GY">Guyana</option>
                                                <option value="HT">Haiti</option>
                                                <option value="HN">Honduras</option>
                                                <option value="HU">Hungary</option>
                                                <option value="IS">Iceland</option>
                                                <option value="IN">India</option>
                                                <option value="ID">Indonesia</option>
                                                <option value="IR">Iran</option>
                                                <option value="IQ">Iraq</option>
                                                <option value="IE">Ireland</option>
                                                <option value="IL">Israel</option>
                                                <option value="IT">Italy</option>
                                                <option value="JM">Jamaica</option>
                                                <option value="JP">Japan</option>
                                                <option value="JO">Jordan</option>
                                                <option value="KZ">Kazakhstan</option>
                                                <option value="KE">Kenya</option>
                                                <option value="KI">Kiribati</option>
                                                <option value="KP">North Korea</option>
                                                <option value="KR">South Korea</option>
                                                <option value="KW">Kuwait</option>
                                                <option value="KG">Kyrgyzstan</option>
                                                <option value="LA">Laos</option>
                                                <option value="LV">Latvia</option>
                                                <option value="LB">Lebanon</option>
                                                <option value="LS">Lesotho</option>
                                                <option value="LR">Liberia</option>
                                                <option value="LY">Libya</option>
                                                <option value="LI">Liechtenstein</option>
                                                <option value="LT">Lithuania</option>
                                                <option value="LU">Luxembourg</option>
                                                <option value="MK">Madagascar</option>
                                                <option value="MW">Malawi</option>
                                                <option value="MY">Malaysia</option>
                                                <option value="MV">Maldives</option>
                                                <option value="ML">Mali</option>
                                                <option value="MT">Malta</option>
                                                <option value="MH">Marshall Islands</option>
                                                <option value="MR">Mauritania</option>
                                                <option value="MU">Mauritius</option>
                                                <option value="MX">Mexico</option>
                                                <option value="FM">Micronesia</option>
                                                <option value="MD">Moldova</option>
                                                <option value="MC">Monaco</option>
                                                <option value="MN">Mongolia</option>
                                                <option value="ME">Montenegro</option>
                                                <option value="MA">Morocco</option>
                                                <option value="MZ">Mozambique</option>
                                                <option value="MM">Myanmar</option>
                                                <option value="NA">Namibia</option>
                                                <option value="NR">Nauru</option>
                                                <option value="NP">Nepal</option>
                                                <option value="NL">Netherlands</option>
                                                <option value="NZ">New Zealand</option>
                                                <option value="NI">Nicaragua</option>
                                                <option value="NE">Niger</option>
                                                <option value="NG">Nigeria</option>
                                                <option value="NO">Norway</option>
                                                <option value="OM">Oman</option>
                                                <option value="PK">Pakistan</option>
                                                <option value="PW">Palau</option>
                                                <option value="PA">Panama</option>
                                                <option value="PG">Papua New Guinea</option>
                                                <option value="PY">Paraguay</option>
                                                <option value="PE">Peru</option>
                                                <option value="PH">Philippines</option>
                                                <option value="PL">Poland</option>
                                                <option value="PT">Portugal</option>
                                                <option value="QA">Qatar</option>
                                                <option value="RO">Romania</option>
                                                <option value="RU">Russia</option>
                                                <option value="RW">Rwanda</option>
                                                <option value="WS">Samoa</option>
                                                <option value="SM">San Marino</option>
                                                <option value="ST">Sao Tome and Principe</option>
                                                <option value="SA">Saudi Arabia</option>
                                                <option value="SN">Senegal</option>
                                                <option value="RS">Serbia</option>
                                                <option value="SC">Seychelles</option>
                                                <option value="SL">Sierra Leone</option>
                                                <option value="SG">Singapore</option>
                                                <option value="SK">Slovakia</option>
                                                <option value="SI">Slovenia</option>
                                                <option value="SB">Solomon Islands</option>
                                                <option value="SO">Somalia</option>
                                                <option value="ZA">South Africa</option>
                                                <option value="ES">Spain</option>
                                                <option value="LK">Sri Lanka</option>
                                                <option value="SD">Sudan</option>
                                                <option value="SR">Suriname</option>
                                                <option value="SZ">Swaziland</option>
                                                <option value="SE">Sweden</option>
                                                <option value="CH">Switzerland</option>
                                                <option value="SY">Syria</option>
                                                <option value="TW">Taiwan</option>
                                                <option value="TJ">Tajikistan</option>
                                                <option value="TZ">Tanzania</option>
                                                <option value="TH">Thailand</option>
                                                <option value="TG">Togo</option>
                                                <option value="TO">Tonga</option>
                                                <option value="TT">Trinidad and Tobago</option>
                                                <option value="TN">Tunisia</option>
                                                <option value="TR">Turkey</option>
                                                <option value="TM">Turkmenistan</option>
                                                <option value="TV">Tuvalu</option>
                                                <option value="UG">Uganda</option>
                                                <option value="UA">Ukraine</option>
                                                <option value="AE">United Arab Emirates</option>
                                                <option value="GB">United Kingdom</option>
                                                <option value="US">United States</option>
                                                <option value="UY">Uruguay</option>
                                                <option value="UZ">Uzbekistan</option>
                                                <option value="VU">Vanuatu</option>
                                                <option value="VA">Vatican City</option>
                                                <option value="VE">Venezuela</option>
                                                <option value="VN">Vietnam</option>
                                                <option value="YE">Yemen</option>
                                                <option value="ZM">Zambia</option>
                                                <option value="ZW">Zimbabwe</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-neutral-800">
                                    <div className="flex items-start gap-3 text-sm">
                                        <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-accent focus:ring-accent focus:ring-offset-primary" />
                                        <label htmlFor="terms" className="text-neutral-400 cursor-pointer select-none leading-relaxed">
                                            I agree to the <Link href="#" className="text-white hover:text-accent transition-colors underline decoration-neutral-700 underline-offset-4">Terms of Service</Link> and <Link href="#" className="text-white hover:text-accent transition-colors underline decoration-neutral-700 underline-offset-4">Privacy Policy</Link>
                                        </label>
                                    </div>
                                    <div className="flex items-start gap-3 text-sm">
                                        <input type="checkbox" id="newsletter" className="mt-1 w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-accent focus:ring-accent focus:ring-offset-primary" />
                                        <label htmlFor="newsletter" className="text-neutral-400 cursor-pointer select-none leading-relaxed">
                                            Subscribe to our newsletter for course updates and promotions
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors group mt-6 disabled:opacity-50"
                                >
                                    {isLoading ? "Creating Account..." : "Create Account"} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>

                            <p className="mt-8 text-center text-sm text-neutral-500">
                                Already have an account?{" "}
                                <Link href="/login" className="text-white hover:text-accent transition-colors font-medium">Login here</Link>
                            </p>
                        </div>

                        {/* Visual Section & Socials */}
                        <div className="w-full lg:col-span-5 flex flex-col h-full gap-8">
                            <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] p-10 flex-grow config-bg flex flex-col justify-center text-center">
                                <h3 className="text-2xl font-bold mb-6">Or sign up with</h3>
                                <div className="space-y-4">
                                    <button onClick={handleGoogleSignup} className="w-full flex justify-center items-center gap-3 py-4 border border-neutral-800 rounded-xl hover:bg-neutral-950 transition-colors bg-neutral-950/50 font-medium">
                                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        Continue with Google
                                    </button>
                                    <button onClick={handleAppleSignup} className="w-full flex justify-center items-center gap-3 py-4 border border-neutral-800 rounded-xl hover:bg-neutral-950 transition-colors bg-neutral-950/50 font-medium text-white">
                                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" transform="scale(0)" />
                                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" opacity="0" />
                                            <path fill="currentColor" d="M16.143 2.503c-.61.745-1.028 1.743-.884 2.723.864.067 1.905-.48 2.502-1.233.541-.66.987-1.68.824-2.639-.938-.037-1.921.464-2.442 1.149zM16.66 6.307c-1.245-.045-2.583.746-3.187.746-.628 0-1.722-.693-2.735-.672-1.314.02-2.535.76-3.213 1.94-1.378 2.396-.352 5.923.992 7.859.654.945 1.42 1.992 2.455 1.956.996-.037 1.385-.64 2.585-.64 1.196 0 1.554.64 2.587.62 1.054-.02 1.713-.96 2.361-1.906.75-1.093 1.06-2.152 1.077-2.206-.023-.01-2.07-.796-2.09-3.165-.018-1.983 1.62-2.936 1.696-2.982-1.002-1.465-2.553-1.666-3.09-1.72z" />
                                        </svg>
                                        Continue with Apple
                                    </button>
                                    <button onClick={handleGithubSignup} className="w-full flex justify-center items-center gap-3 py-4 border border-neutral-800 rounded-xl hover:bg-neutral-950 transition-colors bg-neutral-950/50 font-medium text-white">
                                        <Github className="h-6 w-6" />
                                        Continue with GitHub
                                    </button>
                                </div>
                            </div>

                            {/* Value Prop Graphic */}
                            <div className="bg-neutral-900/50 border border-neutral-800 rounded-[32px] p-8 text-center border-dashed">
                                <div className="flex justify-center mb-6 text-accent">
                                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold mb-2">Join 50,000+ Students</h4>
                                <p className="text-neutral-500 text-sm font-light">Get access to world-class education from industry experts and start building your future today.</p>
                            </div>
                        </div>

                    </div>
                </div>

                <Footer />
            </SmoothScroll>
        </main>
    );
}
