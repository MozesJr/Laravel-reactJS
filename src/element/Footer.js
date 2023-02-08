import React from 'react';
import { Link } from 'react-router-dom';


function Footer() {
    return (
        <footer class="main-footer">
            <div class="float-right d-none d-sm-block">
                <b>Version</b> 1.1
            </div>
            <strong>Copyright &copy; 2023 <Link href="/">SIRARM</Link>.</strong> All rights reserved.
        </footer>
    );
}
export default Footer;