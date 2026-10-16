extends Node3D

var status_label: Label
var response_label: RichTextLabel
var prompt_edit: LineEdit
var endpoint_edit: LineEdit
var http: HTTPRequest
var history: Array = []
var busy := false

func _ready() -> void:
    _setup_environment()
    _setup_interface()
    http = HTTPRequest.new()
    add_child(http)
    http.request_completed.connect(_on_request_completed)
    var xr = XRServer.find_interface("OpenXR")
    if xr and xr.is_initialized():
        get_viewport().use_xr = true
        status_label.text = "Quest OpenXR ready — نص تجريبي"
    else:
        status_label.text = "وضع اختبار بدون OpenXR"

func _setup_environment() -> void:
    var light := DirectionalLight3D.new()
    light.rotation_degrees = Vector3(-55, 30, 0)
    add_child(light)
    var world := WorldEnvironment.new()
    var env := Environment.new()
    env.background_mode = Environment.BG_COLOR
    env.background_color = Color("#c5a780")
    env.ambient_light_source = Environment.AMBIENT_SOURCE_COLOR
    env.ambient_light_color = Color("#e8d1ab")
    world.environment = env
    add_child(world)
    _cube(Vector3(0,-0.08,0),Vector3(10,0.15,10),Color("#b18a5c"))
    _cube(Vector3(0,1.5,-3),Vector3(10,3,0.2),Color("#b49266"))
    _cube(Vector3(-4,1.5,0),Vector3(0.2,3,7),Color("#b49266"))
    _cube(Vector3(4,1.5,0),Vector3(0.2,3,7),Color("#b49266"))
    _cube(Vector3(0,0.4,-1.7),Vector3(2.8,0.5,0.9),Color("#874d38"))
    _cube(Vector3(0,0.7,-1.45),Vector3(0.65,0.9,0.45),Color("#e0d2ac"))
    _cube(Vector3(0,1.38,-1.45),Vector3(0.49,0.47,0.48),Color("#bf8864"))
    _cube(Vector3(0,1.68,-1.45),Vector3(0.57,0.16,0.56),Color("#f3eeee"))
    var camera := XRCamera3D.new()
    camera.current = true
    camera.position = Vector3(0,1.6,1.9)
    add_child(camera)
    var origin := XROrigin3D.new()
    add_child(origin)
    remove_child(camera)
    origin.add_child(camera)

func _cube(pos: Vector3, size: Vector3, color: Color) -> void:
    var mesh_instance := MeshInstance3D.new()
    var box := BoxMesh.new()
    box.size = size
    mesh_instance.mesh = box
    mesh_instance.position = pos
    var mat := StandardMaterial3D.new()
    mat.albedo_color = color
    mesh_instance.material_override = mat
    add_child(mesh_instance)

func _setup_interface() -> void:
    var layer := CanvasLayer.new()
    add_child(layer)
    var panel := PanelContainer.new()
    panel.set_anchors_and_offsets_preset(Control.PRESET_BOTTOM_WIDE)
    panel.offset_top = -280.0
    layer.add_child(panel)
    var stack := VBoxContainer.new()
    panel.add_child(stack)
    var heading := Label.new()
    heading.text = "سوالف الأولين | نسخة نصية تجريبية"
    heading.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    stack.add_child(heading)
    status_label = Label.new()
    status_label.text = "بدء التشغيل..."
    stack.add_child(status_label)
    response_label = RichTextLabel.new()
    response_label.custom_minimum_size = Vector2(0,80)
    response_label.text = "الشايب: حي الله من جانا. وش ودك نسولف عنه؟"
    stack.add_child(response_label)
    endpoint_edit = LineEdit.new()
    endpoint_edit.placeholder_text = "https://your-server.example/chat"
    stack.add_child(endpoint_edit)
    prompt_edit = LineEdit.new()
    prompt_edit.placeholder_text = "اكتب سؤالك هنا (الصوت قيد التطوير)"
    prompt_edit.text_submitted.connect(_send)
    stack.add_child(prompt_edit)
    var button := Button.new()
    button.text = "أرسل"
    button.pressed.connect(func(): _send(prompt_edit.text))
    stack.add_child(button)

func _send(message: String) -> void:
    if busy or message.strip_edges().is_empty():
        return
    var endpoint := endpoint_edit.text.strip_edges()
    if not endpoint.begins_with("https://"):
        status_label.text = "أدخل عنوان HTTPS صالح لخادم المحادثة"
        return
    busy = true
    status_label.text = "الشايب يفكر..."
    var payload := JSON.stringify({"message": message, "history": history})
    var error := http.request(endpoint, ["Content-Type: application/json"], HTTPClient.METHOD_POST, payload)
    if error != OK:
        busy = false
        status_label.text = "تعذر إرسال الرسالة"
    else:
        history.append({"role":"user","content":message})
        prompt_edit.text = ""

func _on_request_completed(_result: int, code: int, _headers: PackedStringArray, body: PackedByteArray) -> void:
    busy = false
    if code != 200:
        status_label.text = "فشل الخادم: HTTP %s" % code
        return
    var parsed = JSON.parse_string(body.get_string_from_utf8())
    if typeof(parsed) != TYPE_DICTIONARY or not parsed.has("reply"):
        status_label.text = "رد الخادم غير متوافق"
        return
    var reply := str(parsed["reply"])
    history.append({"role":"assistant","content":reply})
    response_label.text = "الشايب: " + reply
    status_label.text = "جاهز لسؤالك"
