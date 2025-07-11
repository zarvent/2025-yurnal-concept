import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditsDisplay } from "@/components/credits-display";
import { User, Bell, FileText, Info } from 'lucide-react';

export default function SettingsPage() {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
        <TabsTrigger value="profile">
          <User className="mr-2 h-4 w-4" />
          Perfil
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <Bell className="mr-2 h-4 w-4" />
          Notificaciones
        </TabsTrigger>
        <TabsTrigger value="subscription">
          <FileText className="mr-2 h-4 w-4" />
          Suscripción
        </TabsTrigger>
        <TabsTrigger value="about">
          <Info className="mr-2 h-4 w-4" />
          Acerca de
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>
              Gestiona tu perfil profesional, notificaciones y más. (Funcionalidad en desarrollo)
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-12 text-muted-foreground">
            Próximamente...
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="about">
        <Card>
          <CardHeader>
            <CardTitle>Acerca de Yurnal</CardTitle>
            <CardDescription>
              Nuestra misión y el equipo detrás de este proyecto.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreditsDisplay />
          </CardContent>
        </Card>
      </TabsContent>
       <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notificaciones</CardTitle>
            <CardDescription>
              Configura cómo y cuándo quieres recibir notificaciones. (Funcionalidad en desarrollo)
            </CardDescription>
          </CardHeader>
           <CardContent className="flex items-center justify-center p-12 text-muted-foreground">
            Próximamente...
          </CardContent>
        </Card>
      </TabsContent>
       <TabsContent value="subscription">
        <Card>
          <CardHeader>
            <CardTitle>Suscripción</CardTitle>
            <CardDescription>
              Gestiona tu plan de suscripción de terapeuta. (Funcionalidad en desarrollo)
            </CardDescription>
          </CardHeader>
           <CardContent className="flex items-center justify-center p-12 text-muted-foreground">
            Próximamente...
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
