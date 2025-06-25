import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {SettingsIcon} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useCurrentSettings} from "@/context/SettingsContext";

export default function SettingsComponent() {

    const {settings, setSettings} = useCurrentSettings();

    return (
        <Dialog>
            <DialogTrigger><SettingsIcon className="text-white" /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>
                        <div className="flex items-center justify-between">
                            <div>TEMPERATURE</div>
                            <Select
                                defaultValue={settings.temperatureUnit}
                                onValueChange={(value) => {
                                    setSettings({
                                        ...settings,
                                        temperatureUnit: value as '°C' | '°F'
                                    })
                                }}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="°C">Celsius (°C)</SelectItem>
                                    <SelectItem value="°F">Fahrenheit (°F)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}