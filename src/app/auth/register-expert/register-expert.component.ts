import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register-expert',
  standalone: true,
  imports: [RouterLink,NgClass,FormsModule,ReactiveFormsModule],
  templateUrl: './register-expert.component.html',
  styleUrl: './register-expert.component.css'
})
export class RegisterExpertComponent {
  registerForm: FormGroup;
  loading = false;
  errorMessage = '';
  selectedRole = 'EXPERT'; 
  currentStep = 1;
  totalSteps = 3;
  showPassword = false;
  showConfirmPassword = false;
  selectedDomains: string[] = [];
  domainsOptions: string[] = [
    'Développement Web', 
    'Design UX', 
    'JavaScript', 
    'dev web', 
    'uiux design', 
    'dev mobile', 
    'devops'
  ];
  
  profileImage: string | ArrayBuffer | null = null;
  certificationFiles: File[] = [];
  cvFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.registerForm = this.formBuilder.group({
      // Step 1: Personal info
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: [this.selectedRole, [Validators.required]],
      
      // Step 2: Professional info
      profileDescription: ['', [Validators.required]],
      domaines: [this.selectedDomains],
      niveauEtude: [''],
      experience: [''],
      linkedinUrl: [''],
      portfolioUrl: ['']
    }, { 
      validators: this.passwordMatchValidator 
    });
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      form.get('confirmPassword')?.setErrors(null);
      return null;
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched(this.registerForm);
      return;
    }

    this.loading = true;
    const formData = this.prepareFormData();
    
    const endpoint = this.selectedRole === 'EXPERT' 
      ? '/register/expert' 
      : '/register/apprenant';

    this.http.post(`${environment.apiUrl}${endpoint}`, formData)
      .subscribe({
        next: (response: any) => {
          this.loading = false;
          // Afficher un message de succès et rediriger vers la page de connexion
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.error?.message || 'Une erreur s\'est produite lors de l\'inscription.';
        }
      });
  }

  prepareFormData() {
    // Préparer les données du formulaire pour l'envoi à l'API
    const formValue = this.registerForm.value;
    
    // Créer un objet avec les propriétés du formulaire
    const registerData: any = {
      nom: formValue.nom,
      prenom: formValue.prenom,
      email: formValue.email,
      password: formValue.password,
      phone: formValue.phone,
      role: formValue.role,
      profileDescription: formValue.profileDescription,
      domaines: this.selectedDomains,
      niveauEtude: formValue.niveauEtude,
      experience: formValue.experience,
      linkedinUrl: formValue.linkedinUrl,
      portfolioUrl: formValue.portfolioUrl
    };

    // Ajouter l'image de profil si disponible
    if (this.profileImage) {
      registerData.image = this.profileImage;
    }

    // Ajouter les certifications si disponibles
    if (this.certificationFiles.length > 0) {
      registerData.certifications = this.certificationFiles.map(file => file.name);
    }

    // Ajouter le CV si disponible
    if (this.cvFile) {
      // Ici, vous devriez probablement convertir le fichier en base64 ou l'envoyer séparément
      // Pour l'exemple, on inclut juste le nom du fichier
      registerData.cv = this.cvFile.name;
    }

    return registerData;
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      // Validation de chaque étape
      if (this.currentStep === 1) {
        const step1Controls = ['nom', 'prenom', 'email', 'phone', 'password', 'confirmPassword'];
        if (this.validateStepControls(step1Controls)) {
          this.currentStep++;
        }
      } else {
        this.currentStep++;
      }
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  validateStepControls(controlNames: string[]): boolean {
    let valid = true;
    for (const name of controlNames) {
      const control = this.registerForm.get(name);
      if (control) {
        control.markAsTouched();
        if (control.invalid) {
          valid = false;
        }
      }
    }
    return valid;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onFileSelected(event: any, fileType: 'profile' | 'certification' | 'cv') {
    const file = event.target.files[0];
    if (file) {
      if (fileType === 'profile') {
        this.handleProfileImage(file);
      } else if (fileType === 'certification') {
        this.certificationFiles.push(file);
      } else if (fileType === 'cv') {
        this.cvFile = file;
      }
    }
  }

  handleProfileImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.profileImage = e.target?.result || null;
    };
    reader.readAsDataURL(file);
  }

  toggleDomain(domain: string) {
    const index = this.selectedDomains.indexOf(domain);
    if (index === -1) {
      this.selectedDomains.push(domain);
    } else {
      this.selectedDomains.splice(index, 1);
    }
    this.registerForm.patchValue({
      domaines: this.selectedDomains
    });
  }

  isDomainSelected(domain: string): boolean {
    return this.selectedDomains.includes(domain);
  }

  // Pour gérer la sélection du rôle
  setRole(role: string) {
    this.selectedRole = role;
    this.registerForm.patchValue({
      role: role
    });
  }
}