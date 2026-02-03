import { ThemeProvider } from '../../context/theme-context'
import { RoleProvider } from '../../context/role-context'

export default function RootLayout({ children }) {
    return (
        <html>
            <body>
                <ThemeProvider>
                    <RoleProvider>
                        {children}
                    </RoleProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}