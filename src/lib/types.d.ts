export type EmailInvite = {
	email: string;
}

export type AuthUserResponse = {
	user?: {
	  id: string;
	  aud: string;
	  role: string;
	  email: string;
	  invited_at: string;
	  phone: string;
	  confirmation_sent_at: string;
	  created_at: string;
	  updated_at: string;
	}
}