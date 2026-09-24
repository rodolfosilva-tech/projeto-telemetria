import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const platformId = inject(PLATFORM_ID);

    // Se estiver executando no servidor (SSR), não bloqueia antes de carregar o browser/localStorage
    if (!isPlatformBrowser(platformId)) {
        return true;
    }

    if (authService.getToken()) {
        return true;
    }

    router.navigate(['/login']);
    return false;
};
