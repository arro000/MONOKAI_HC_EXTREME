import { Component, computed, input, signal } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
    readonly id: number;
    name: string;
    active: boolean;
}

@Component({
    selector: 'app-badge',
    standalone: true,
    template: `<strong [title]="label()">{{ label() }}</strong>`,
    styles: [`strong { color: #66d9ef; font-weight: bold; }`],
})
export class BadgeComponent {
    readonly label = input.required<string>();
}

@Component({
    selector: 'app-theme-preview',
    standalone: true,
    imports: [BadgeComponent, DatePipe, UpperCasePipe, FormsModule],
    templateUrl: './preview.component.html',
})
export class ThemePreviewComponent {
    readonly title = signal('Team');
    readonly users = signal<User[]>([{ id: 1, name: 'Ada', active: true }]);
    readonly activeCount = computed(() => this.users().filter(user => user.active).length);
    readonly today = new Date();
    search = '';

    selectUser(user: User): void {
        this.title.set(`Selected: ${user.name}`);
    }
}
